// const notification = require("./notification.js");
const SpotifyWebApi = require("spotify-web-api-node");
// const state = require("../robots/state.js");
let cacheProvider = require('../SchelasCache')



async function robot(playName) {
    const playlistNames = cacheProvider.instance().get('playlistNames')
    let myPlaylist = playlistNames[playName];
    const { access_token, refresh_token } = cacheProvider.instance().get('tokens');
    const spotify = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    });

    await spotify.setAccessToken(access_token);
    await spotify.setRefreshToken(refresh_token);

    await spotify.getUserPlaylists().then(async (data) => {
        let items = data.body.items.map((item) => {
            return { id: item.id, name: item.name };
        });
        await spotify.play({ context_uri: 'spotify:playlist:' + items.filter((e) => e.name = myPlaylist)[0].id }).catch(e => console.log('> error playing', e))
    }).catch(e => console.log('> Error getting playlists', e));


    console.log(`> Playing the ${myPlaylist} playlist...`);
    // notification(`Playing the ${myPlaylist} playlist...`);
}

module.exports = robot;
