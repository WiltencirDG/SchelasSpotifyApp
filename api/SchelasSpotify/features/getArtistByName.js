// api/SchelasSpotify/features/discover.js
let cacheProvider = require('../SchelasCache')

const robots = {
  getArtistByName: require("../robots/getArtistByName.js"),
  reAuthenticate: require("../robots/reAuthenticate.js"),
};

async function getArtistByName(option, value, quantity, bpm) {
  try {
    return await robots.getArtistByName(value);
  } catch (e) {
    if (e.statusCode === 401) {
      await robots.reAuthenticate();
      return await robots.getArtistByName();
    }
  }
}

module.exports = getArtistByName;
