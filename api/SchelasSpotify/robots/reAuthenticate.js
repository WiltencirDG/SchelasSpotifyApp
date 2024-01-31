const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("./state.js");
let cacheProvider = require('../SchelasCache')

async function robot() {
  const { access_token, refresh_token } = cacheProvider.instance().get('tokens')
  const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });

  await spotify.setAccessToken(access_token);
  await spotify.setRefreshToken(refresh_token);

  await spotify.refreshAccessToken().then((data) => {
    let { access_token, refresh_token } = cacheProvider.instance().take('tokens')
    cacheProvider.instance().del('tokens')
    cacheProvider.instance().set('tokens', { access_token: data.body.access_token, refresh_token })
    console.log("> Reauthenticated.");
  });
}

module.exports = robot;
