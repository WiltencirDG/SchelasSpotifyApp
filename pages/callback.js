// pages/callback.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const encryptToken = (token) => {
    // Implement a secure encryption mechanism
    return token; // Replace this with your encryption logic
};

const fetchSpotifyTokens = async (code) => {
    if (!code) return
    var clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    var clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
    var redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
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

const fetchSpotifyUserData = async (accessToken) => {
    // Make a request to Spotify API's /me endpoint to get user details
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const userData = await response.json();
        return userData;
    } else {
        console.error('Failed to fetch user data from Spotify API:', response.status);
        return null;
    }
};

const CallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { code, error } = router.query;

        const handleCallback = async (code) => {
            if (error) {
                localStorage.removeItem('spotifyAccessToken');
                localStorage.removeItem('spotifyRefreshToken');
                localStorage.removeItem('spotifyUserName');
                localStorage.removeItem('spotifyUserImage');
                router.push('/');
                return
            }
            const tokens = await fetchSpotifyTokens(code)
            if (tokens?.access_token) {
                // Encrypt the access token before storage
                const encryptedToken = encryptToken(tokens.access_token);
                const encryptedRefreshToken = encryptToken(tokens.refresh_token);

                // Save the access token and its expiration details (for later use)
                localStorage.setItem('spotifyAccessToken', encryptedToken);
                localStorage.setItem('spotifyRefreshToken', encryptedRefreshToken);

                // Fetch the user's name using the access token
                const user = await fetchSpotifyUserData(tokens.access_token);

                // Save the user's name
                localStorage.setItem('spotifyUserName', user ? user?.display_name : "Visitante");
                localStorage.setItem('spotifyUserImage', user?.images[0]?.url);

                // Redirect the user back to the app's index page
                router.push('/');
            }
        };

        handleCallback(code);
    }, [router.query]);

    return (
        <div className="min-h-screen bg-purple text-white">
            <header className="p-5 text-center bg-black bg-opacity-60">
                <h1 className="text-4xl font-bold text-green">Bem-vindo de volta!</h1>
            </header>

            <main className="p-5">
                <section>
                    <h2 className="text-2xl font-bold mb-5">Você fez login com sucesso.</h2>
                    <p className="text-lg">Agora você pode continuar a usar o aplicativo.</p>
                </section>
            </main>

            <footer className="p-5 text-center bg-black bg-opacity-60 text-gray-600">
                <p>Feito com ❤️ @ Schelas</p>
            </footer>
        </div>
    );
};

export default CallbackPage;
