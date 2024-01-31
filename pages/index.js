// pages/index.js

import { useEffect } from 'react';
import Layout from '../components/Layout';
import SpotifyLoginButton from '../components/SpotifyLoginButton';
import SearchScreen from '../components/SearchScreen';

const IndexPage = () => {


    return (
        <Layout>
            <h2>Welcome to Schelas for Spotify</h2>

            {/* Include the SpotifyLoginButton component */}
            <SpotifyLoginButton />

            {/* Include your SearchScreen component below */}
            <SearchScreen />
        </Layout>
    );
};

export default IndexPage;
