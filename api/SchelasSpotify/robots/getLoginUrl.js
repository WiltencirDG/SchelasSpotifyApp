const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("./state.js");
let cacheProvider = require('../SchelasCache')
const scopes = ["user-read-private","user-read-email","user-follow-read","user-library-read","user-top-read","user-read-playback-state","user-read-currently-playing","user-follow-modify","user-library-modify","playlist-modify-public","playlist-modify-private","user-modify-playback-state","ugc-image-upload","streaming"]
async function robot() {
  const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.SPOTIFY_REDIRECT_URI,
  });
  try {
    var loginUrl = await spotify.createAuthorizeURL(scopes);
    
    return { loginUrl }

  } catch (err) {
    console.log(err);
  }
}

module.exports = robot;
