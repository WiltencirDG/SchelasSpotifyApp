const SpotifyWebApi = require("spotify-web-api-node");
let cacheProvider = require('../SchelasCache')

async function robot(artist) {
  const { access_token, refresh_token } = cacheProvider.instance().get('tokens');
  const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });

  await spotify.setAccessToken(access_token);
  await spotify.setRefreshToken(refresh_token);

  let artists = [];
  console.log(
    "> Getting Artists..."
  );
  await spotify.searchArtists(artist,{ limit : 3 })
    .then((data) => {
      artists.push(...data.body.artists.items)
    })

  return artists
}

module.exports = robot;
