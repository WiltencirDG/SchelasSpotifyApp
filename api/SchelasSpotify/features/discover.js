// api/SchelasSpotify/features/discover.js
let cacheProvider = require('../SchelasCache')

const robots = {
  playlist: require("../robots/playlist.js"),
  reAuthenticate: require("../robots/reAuthenticate.js"),
  discovery: require("../robots/discovery.js"),
  play: require("../robots/play.js"),
};

async function discover(option, value, quantity, bpm) {
  var songs = []
  try {
    songs = await robots.discovery(value, option, quantity, bpm);
  } catch (e) {
    //console.log(e);
    if (e.statusCode === 401) {
      await robots.reAuthenticate();
      songs = await robots.discovery(value, option, quantity, bpm);
    }
  }

  try {
    await robots.playlist("discover");
    await robots.play("discover");
  } catch (e) {
    if (e.statusCode === 401) {
      await robots.reAuthenticate();
      await robots.playlist("discover");
      await robots.play("discover");
    }
  }

  return songs;
}

module.exports = discover;
