// components/SpotifyLoginButton.js

import Image from 'next/image';
import { useEffect, useState } from 'react';


const SpotifyLoginButton = () => {

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
            const existingUserName = localStorage.getItem('spotifyUserName');

            if (existingUserName) {
                // User is already authenticated, handle accordingly
                console.log('User is already authenticated. Welcome back,', existingUserName);
                // return;
            }
        }

        // User needs to authenticate 
        const requestBody = {
            feature: 'getLoginUrl'
        };
        // Call your serverless function using fetch
        const response = await fetch('/api/schelas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if(response.ok){
            var res = await response.json()
            window.location.href = res.data.loginUrl;
        }
    };


    return (
        <button
            onClick={handleSpotifyAuth}
            className="bg-primary hover:bg-primary text-white font-bold h-12 mt-4 mr-2 px-4 rounded-full focus:outline-none focus:shadow-outline-green active:bg-primary flex flex-row items-center"
        >
            {(logged &&
                <Image width={32} height={32} alt="Profile picture of the user logged in" className="rounded-full mr-4" src={profile}></Image>
            )}
            {message}
        </button >
    );
};

export default SpotifyLoginButton;
