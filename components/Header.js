// components/Header.js

import React from 'react';
import SpotifyLoginButton from './SpotifyLoginButton';

const Header = () => {

    return (
        <header className="bg-black p-4 mb-8 flex flex-row justify-between">
            <img src="/logo.png" alt="Schelas for Spotify" className="max-w-40" />
            <SpotifyLoginButton />
        </header>
    );
};

export default Header;
