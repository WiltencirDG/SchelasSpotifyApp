// pages/api/schelas.js

import runFeature from './SchelasSpotify/SchelasSpotify';

export default async function handler(req, res) {
    const { feature, access_token, refresh_token, value, option, quantity, bpm } = req.body;

    if (!feature) {
        res.status(400).json({ error: 'Feature not specified in the request body.' });
        return;
    }

    let returns = await runFeature(feature, access_token, refresh_token, value, option, quantity, bpm);

    res.status(200).json({ message: 'Playlist generated successfully! Enjoy', data: returns });
}
