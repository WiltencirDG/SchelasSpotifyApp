// api/SchelasSpotify/features/discover.js
let cacheProvider = require('../SchelasCache')

const robots = {
  authenticate: require("../robots/authenticate.js"),
  reAuthenticate: require("../robots/reAuthenticate.js"),
};

async function authenticate(code) {

  try {
    return await robots.authenticate(code);
  } catch (e) {
    // if (e.statusCode === 401) {
    //   await robots.reAuthenticate();
    //   return await robots.genres();
    // }
  }
}

module.exports = authenticate;
