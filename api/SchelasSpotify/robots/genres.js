const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("../robots/state.js");

let cacheProvider = require('../SchelasCache');

async function robot() {
  const { access_token, refresh_token } = cacheProvider.instance().get('tokens');
  const spotify = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  });

  await spotify.setAccessToken(access_token);
  await spotify.setRefreshToken(refresh_token);

  const genres = [];

  // let genre = value;
  console.log(
    "> Getting all genres..."
  );
  await spotify
    .getAvailableGenreSeeds()
    .then((data) => {
      genres.push(...data.body.genres)
      // data.body.tracks.forEach((track) => {
      //   newSongs.push({
      //     id: track.id,
      //     artist: track.artists[0].name,
      //     song: track.name,
      //     playlist: "discover",
      //   });
      // });
    })

  return genres



  // cacheProvider.instance().set("genres", newSongs);

}

module.exports = robot;
