// pages/api/schelas.js

import runFeature from '../../api/SchelasSpotify/SchelasSpotify';

export default async function handler(req, res) {
    const { feature, code, value, option, quantity, bpm } = req.body;

    if (!feature) {
        res.status(400).json({ error: 'Feature not specified in the request body.' });
        return;
    }

    let returns = await runFeature(feature, value, option, quantity, bpm, code);

    res.status(200).json({ message: 'Playlist generated successfully! Enjoy', data: returns });
}
