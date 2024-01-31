// api/schelas.js

const features = {
    upgrade: require("./features/upgrade.js"),
    emotion: require("./features/emotion.js"),
    discover: require("./features/discover.js"),
    like: require("./features/like.js"),
    find: require("./features/find.js"),
    // Add other features as needed
};

async function runFeature(feature) {
    try {
        if (features[feature]) {
            await features[feature]();
        } else {
            console.log(`> Feature '${feature}' is not implemented yet.`);
        }
    } catch (error) {
        console.error(`> Error running feature '${feature}':`, error);
    }
}

module.exports = runFeature;
