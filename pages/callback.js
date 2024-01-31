// pages/callback.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const encryptToken = (token) => {
    // Implement a secure encryption mechanism
    return token; // Replace this with your encryption logic
};

const fetchSpotifyTokens = async (code) => {
    if (!code) return
    var clientId = process.env.SPOTIFY_CLIENT_ID;
    var clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    var redirectUri = process.env.SPOTIFY_REDIRECT_URI;
    var basicAuth = Buffer.from(clientId + ':' + clientSecret).toString('base64')

    const response = await fetch(`https://accounts.spotify.com/api/token?` +
        `client_id=${clientId}` +
        `&client_secret=${clientSecret}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&grant_type=authorization_code` +
        `&code=` + code +
        `&scope=scope=user-read-private user-read-email user-follow-read user-library-read user-top-read user-read-playback-state user-read-currently-playing user-follow-modify user-library-modify playlist-modify-public playlist-modify-private user-modify-playback-state ugc-image-upload streaming`, { method: 'POST', headers: { Authorization: 'Basic ' + basicAuth, "Content-type": "application/x-www-form-urlencoded" } });

    console.log('responsse', response)
    if (response.ok) {
        const tokens = await response.json();
        return tokens;
    } else {
        console.error('Failed to fetch user data from Spotify API:', response.status, response.statusText);
        return null;
    }
};

const fetchSpotifyUserName = async (accessToken) => {
    // Make a request to Spotify API's /me endpoint to get user details
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const userData = await response.json();
        return userData.display_name;
    } else {
        console.error('Failed to fetch user data from Spotify API:', response.status, response.statusText);
        return null;
    }
};

const CallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { code } = router.query;
        console.log('query', code)
        const handleCallback = async (code) => {
            console.log('handle', code)

            const tokens = await fetchSpotifyTokens(code)
            console.log('afterrr', tokens)

            if (tokens?.access_token) {
                // Encrypt the access token before storage
                const encryptedToken = encryptToken(tokens.access_token);
                const encryptedRefreshToken = encryptToken(tokens.refresh_token);

                // Save the access token and its expiration details (for later use)
                localStorage.setItem('spotifyAccessToken', encryptedToken);
                localStorage.setItem('spotifyRefreshToken', encryptedRefreshToken);

                // Fetch the user's name using the access token
                const userName = await fetchSpotifyUserName(tokens.access_token);

                // Save the user's name
                localStorage.setItem('spotifyUserName', userName);

                // Redirect the user back to the app's index page
                router.push('/');
            }
        };

        handleCallback(code);
    }, [router.query]);

    return <div>Callback Page</div>;
};

export default CallbackPage;
