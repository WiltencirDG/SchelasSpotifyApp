// components/SpotifyLoginButton.js

import React, { useEffect, useState } from 'react';


const SpotifyLoginButton = () => {

    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
    const [message, setMessage] = useState('Authenticate with Spotify')
    const [logged, setLogged] = useState(false)
    const [profile, setProfile] = useState('')

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('spotifyUserName') != null) {
            setMessage(`${localStorage.getItem('spotifyUserName')}`)
            setProfile(localStorage.getItem('spotifyUserImage'))
            setLogged(true)
        }
    }, [])


    const handleSpotifyAuth = async () => {
        // Check if the access token and user name are already saved
        if (typeof window !== 'undefined') {
            const existingAccessToken = localStorage.getItem('spotifyAccessToken');
            const existingUserName = localStorage.getItem('spotifyUserName');

            if (existingAccessToken && existingUserName) {
                // User is already authenticated, handle accordingly
                console.log('User is already authenticated. Welcome back,', existingUserName);
                return;
            }
        }

        // User needs to authenticate
        const authUrl = `https://accounts.spotify.com/authorize?` +
            `client_id=${clientId}` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&response_type=code` +
            `&scope=user-read-private user-read-email user-follow-read user-library-read user-top-read user-read-playback-state user-read-currently-playing user-follow-modify user-library-modify playlist-modify-public playlist-modify-private user-modify-playback-state ugc-image-upload streaming`; // Add additional scopes as needed

        // Redirect the user to the Spotify authorization page
        window.location.href = authUrl;
    };


    return (
        <button
            onClick={handleSpotifyAuth}
            className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-green active:bg-green flex flex-row items-center"
        >
            {(logged &&
                <img className="rounded-full mr-4" src={profile} width="32"></img>
            )}
            {message}
        </button >
    );
};

export default SpotifyLoginButton;
