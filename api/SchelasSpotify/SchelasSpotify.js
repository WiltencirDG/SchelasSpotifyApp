// api/SchelasSpotify/SchelasSpotify.js

let cacheProvider = require('./SchelasCache')

cacheProvider.start(function (err) {
	if (err) console.error(err)
})

const features = {
	discover: require("./features/discover.js"),
	genres: require("./features/genre.js"),
	// Add other features as needed
};

async function runFeature(feature, access_token, refresh_token, value, option, quantity, bpm) {
	cacheProvider
		.instance()
		.set('playlistNames', {
			"anger": "ANGER",
			"joy": "JOY",
			"sadness": "SADNESS",
			"disgust": "DISGUST",
			"fear": "FEAR",
			"discover": "Discovering with Schelas!"
		})

	cacheProvider
		.instance()
		.set('tokens', { access_token, refresh_token })

	try {
		if (features[feature]) {
			return await features[feature](value, option, quantity, bpm);
		} else {
			console.log(`> Feature '${feature}' is not implemented yet.`);
		}
	} catch (error) {
		console.error(`> Error running feature '${feature}':`, error);
	}
}

module.exports = runFeature;
