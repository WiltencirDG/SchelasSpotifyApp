const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("../robots/state.js");

let cacheProvider = require('../SchelasCache')

async function robot(pGenre, value, quantity, bpm) {
  const { access_token, refresh_token } = cacheProvider.instance().get('tokens');
  const spotify = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  });

  await spotify.setAccessToken(access_token);
  await spotify.setRefreshToken(refresh_token);

  const newSongs = [];
  console.log('discover ', pGenre, value, quantity, bpm)
  if (pGenre != undefined) {
    if (pGenre == "current" || pGenre == "CURRENT") {
      console.log("> Getting the current song...");
      await spotify
        .getMyCurrentPlayingTrack()
        .then(async (song) => {
          await spotify
            .getRecommendations({
              seed_tracks: song.body.item.id,
              seed_artists: song.body.item.artists[0].id,
              limit: quantity || 20,
              offset: 0,
            })
            .then((data) => {
              data.body.tracks.forEach((track) => {
                newSongs.push({
                  id: track.id,
                  artist: track.artists[0].name,
                  song: track.name,
                  playlist: "discover",
                });
              });
            })
        })
    } else if (pGenre == "artist" || pGenre == "ARTIST") {
      let artists = value.split(',');
      for (let pArtist of artists) {
        let artist = pArtist.trim();
        console.log("> Getting top tracks for " + artist + "...");
        await spotify
          .searchArtists(artist, { limit: 1, offset: 0 })
          .then(async (data) => {
            await spotify
              .getArtistTopTracks(data.body.artists.items[0].id, "US")
              .then((tracks) => {
                tracks.body.tracks.forEach((track) => {
                  newSongs.push({
                    id: track.id,
                    artist: track.artists[0].name,
                    song: track.name,
                    playlist: "discover",
                  });
                });
              });
          });
      }
    } else if (pGenre == "genre" || pGenre == "GENRE") {
      let genre = value;
      console.log(
        "> Getting recommendations based on " + genre + " genre(s)..."
      );
      await spotify
        .getRecommendations({
          seed_genres: genre.split(",").map((gen) => gen.trimStart()),
          limit: quantity || 20,
          offset: 0,
        })
        .then((data) => {
          data.body.tracks.forEach((track) => {
            newSongs.push({
              id: track.id,
              artist: track.artists[0].name,
              song: track.name,
              playlist: "discover",
            });
          });
        })

    } else if (pGenre == "bpm" || pGenre == "BPM") {
      let artists = value.split(',');
      let seedArtist = []
      for (let pArtist of artists) {
        let artist = pArtist.trim();
        console.log("> Getting id for " + artist + "...");
        await spotify
          .searchArtists(artist, { limit: 1, offset: 0 })
          .then(async (data) => {
            seedArtist.push(data.body.artists.items[0].id)
          });
      }

      let tempo = bpm;
      console.log(
        "> Getting recommendations based on " + tempo + " bpm..."
      );

      await spotify
        .getRecommendations({
          seed_artists: seedArtist.join(','),
          target_tempo: tempo,
          min_tempo: tempo - 5,
          limit: quantity || 35,
          offset: 0,
        })
        .then((data) => {
          data.body.tracks.forEach((track) => {
            newSongs.push({
              id: track.id,
              artist: track.artists[0].name,
              song: track.name,
              playlist: "discover",
            });
          });
        })
        .catch((e) => console.log(e));
    }

    cacheProvider.instance().set("songs", newSongs);
  } else {
    console.log("> Discovering new tracks...");
    await spotify
      .getMyTopTracks({ limit: 5, offset: 0 })
      .then(async (tops) => {
        await spotify
          .getRecommendations({
            seed_tracks: tops.body.items.map((song) => song.id),
            limit: 10,
            offset: 0,
          })
          .then((data) => {
            data.body.tracks.forEach((track) => {
              newSongs.push({
                id: track.id,
                artist: track.artists[0].name,
                song: track.name,
                playlist: "discover",
              });
            });
          })
          .catch((e) => console.log(e));

        cacheProvider.instance().set("songs", newSongs);
      })
      .catch((e) => console.log(e));
  }
}

module.exports = robot;
