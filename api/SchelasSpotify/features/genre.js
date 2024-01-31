// api/SchelasSpotify/features/discover.js
let cacheProvider = require('../SchelasCache')

const robots = {
  genres: require("../robots/genres.js"),
  reAuthenticate: require("../robots/reAuthenticate.js"),

};

async function genre() {

  try {
    return await robots.genres();
  } catch (e) {
    if (e.statusCode === 401) {
      await robots.reAuthenticate();
      return await robots.genres();
    }
  }
}

module.exports = genre;
