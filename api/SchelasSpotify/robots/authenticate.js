const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("./state.js");
let cacheProvider = require('../SchelasCache')

async function robot(code) {
  const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  try {
    var data = await spotify.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;

    cacheProvider
      .instance()
      .set('tokens', { access_token, refresh_token })
    
    await spotify.setAccessToken(access_token);
    await spotify.setRefreshToken(refresh_token);
    
    return await spotify.getMe();

  } catch (err) {
    console.log(err);
  }
}

module.exports = robot;
