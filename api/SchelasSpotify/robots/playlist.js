// api/SchelasSpotify/robots/playlist.js

const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("./state.js");
let cacheProvider = require('../SchelasCache')

const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function addToPlaylist(pPlaylist) {
	console.log("> Working on playlists...");
	const playlistNames = cacheProvider.instance().get('playlistNames')

	const { access_token, refresh_token } = cacheProvider.instance().get("tokens");

	const spotify = new SpotifyWebApi({
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		redirectUri: process.env.SPOTIFY_REDIRECT_URI,
	});

	spotify.setAccessToken(access_token);
	spotify.setRefreshToken(refresh_token);

	const songsRaw = cacheProvider.instance().get('songs')
	const songs = songsRaw
		.filter((v, i, a) => a.findIndex((t) => t.song === v.song) === i)
		.filter((song) =>
			pPlaylist == undefined
				? song.playlist != null
				: song.playlist == pPlaylist
		);

	let playlists = await checkPlaylists();

	for (let song of songs) {
		let thisPlaylistId = playlists.filter(
			(play) => play.name == playlistNames[song.playlist]
		)[0].id;
		song.addToPlaylist = !(await musicExists(song.id, thisPlaylistId));
	}
	await addToPlaylist();

	async function addToPlaylist() {
		const songsToAdd = songs.filter((song) => song.addToPlaylist);
		cacheProvider.instance().set('songs', songsToAdd)



		console.log("> Checking songs to add to playlists...");
		var hasSongsToAdd = false;
		Object.keys(playlistNames).forEach(async (playlistName) => {
			if (
				songsToAdd.filter((song) => song.playlist == playlistName).length > 0
			) {
				hasSongsToAdd = true;
				console.log(
					'> Adding to ' +
					playlistNames[playlistName] +
					': ' +
					songsToAdd.filter((song) => song.playlist == playlistName).length +
					' song(s)...'
				);
			}
		});
		if (!hasSongsToAdd) {
			console.log("> 0 songs to add to playlists...");
			return 0;
		}
		console.log("> Adding songs to playlists...");
		Object.keys(playlistNames).forEach(async (playlistName) => {
			if (
				songsToAdd.filter((song) => song.playlist == playlistName).length > 0
			) {
				let playlistId = playlists.filter(
					(play) => play.name == playlistNames[playlistName]
				)[0].id;
				let thisSongs = songsToAdd
					.filter((song) => song.playlist == playlistName)
					.map((song) => "spotify:track:" + song.id);

				let i, j;
				let thisSongsAux, chunk = 99;
				for (i = 0, j = thisSongs.length; i < j; i += chunk) {
					thisSongsAux = thisSongs.slice(i, i + chunk);
					await spotify.addTracksToPlaylist(playlistId, thisSongsAux);
				}
			}
		});
	}

	async function musicExists(song, playlistId) {
		return await spotify.getPlaylistTracks(playlistId).then((data) => {
			return (
				data.body.items.map((item) => item.id).indexOf(song) > -1
			);
		});
	}
	async function checkPlaylists() {
		let userPlaylists = await spotify.getUserPlaylists().then((data) => {
			return data.body.items.map((item) => {
				return { id: item.id, name: item.name };
			});
		});

		const userId = await spotify.getMe().then((data) => {
			return data.body.id;
		});

		for (let playName of Object.keys(playlistNames)) {
			await creation(userPlaylists, playName, userId);
		}

		userPlaylists = await spotify.getUserPlaylists().then((data) => {
			return data.body.items.map((item) => {
				return { id: item.id, name: item.name };
			});
		});

		return userPlaylists;
	}

	async function creation(userPlaylists, playlistName, userId) {
		let myPlaylist = playlistNames[playlistName];
		if (userPlaylists.map((item) => item.name).indexOf(myPlaylist) == -1) {
			if (songs.filter((song) => song.playlist == playlistName).length > 0) {
				console.log("> Creating " + playlistName + " playlist...");
				await spotify.createPlaylist(myPlaylist).then(async (data) => {
					let playlistId = data.body.id.toString();
					const response = await fetch('https://schelas-spotify.vercel.app/resources/covers/' + playlistName + '.jpg');
					const blob = await response.arrayBuffer();

					let image = Buffer.from(
						blob,
					).toString('base64')
					await fetch(
						`https://api.spotify.com/v1/playlists/${playlistId}/images`,
						{
							method: "PUT",
							mode: "cors",
							cache: "no-cache",
							headers: {
								"Content-Type": "image/gif",
								Authorization: `Bearer ${access_token}`,
							},
							body: image,
						}
					).catch((e) => console.log("... Error on uploading image."));
				})
			}
		} else {
			if (
				playlistName == "discover" &&
				songs.filter((song) => song.playlist == playlistName).length > 0
			) {
				console.log("> Creating " + playlistName + " playlist...");
				await spotify
					.unfollowPlaylist(
						userPlaylists.filter((item) => item.name == myPlaylist)[0].id
					)
					.then(async (rem) => {
						await spotify
							.createPlaylist(myPlaylist)
							.then(async (data) => {
								let playlistId = data.body.id.toString();

								const response = await fetch('https://schelas-spotify.vercel.app/resources/covers/' + playlistName + '.jpg');
								const blob = await response.arrayBuffer();

								let image = Buffer.from(
									blob,
								).toString('base64')

								await fetch(
									`https://api.spotify.com/v1/playlists/${playlistId}/images`,
									{
										method: "PUT",
										mode: "cors",
										cache: "no-cache",
										headers: {
											"Content-Type": "image/jpeg",
											Authorization: `Bearer ${access_token}`,
										},
										body: image,
									}
								).catch((e) => console.log("... Error on uploading image."));
							}).catch(e => console.log('creating playlist error1', e));
					});
			}
		}
	}
}

module.exports = addToPlaylist;
