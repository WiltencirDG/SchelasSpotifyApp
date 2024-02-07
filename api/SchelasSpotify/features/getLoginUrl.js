// api/SchelasSpotify/features/discover.js
let cacheProvider = require('../SchelasCache')

const robots = {
  getLoginUrl: require("../robots/getLoginUrl.js")
};

async function getLoginUrl(code) {

  try {
    return await robots.getLoginUrl(code);
  } catch (e) {
    // if (e.statusCode === 401) {
    //   await robots.reAuthenticate();
    //   return await robots.genres();
    // }
  }
}

module.exports = getLoginUrl;
