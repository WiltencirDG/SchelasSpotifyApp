// components/SearchScreen.js

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Button } from '../components'

const SearchScreen = () => {
    const [description, setDescription] = useState('');
    const [bpm, setBpm] = useState('');
    const [logged, setLogged] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0); // Track the selected tab
    const [numberOfMusics, setNumberOfMusics] = useState(20); // New state for the number of musics
    const [genres, setGenres] = useState([]); // New state for the genres

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('spotifyUserName') != null) {
            setLogged(true)
        }
    }, [])

    useEffect(() => {
        // Fetch genres from the API when the component mounts
        fetchGenres();
    }, logged);

    const fetchGenres = async () => {
        console.log('> Fetching genres')
        const accessToken = localStorage.getItem('spotifyAccessToken');
        const refreshToken = localStorage.getItem('spotifyRefreshToken');

        // Ensure that the access token is available
        if (!accessToken) {
            console.error('Access token not available. Please authenticate with Spotify.');
            return;
        }
        try {
            const requestBody = {
                feature: 'genres',
                access_token: accessToken,
                refresh_token: refreshToken
            };
            // Call your serverless function using fetch
            const response = await fetch('/api/schelas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            setGenres(data.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const generatePlaylist = async () => {
        setShowLoader(true)
        try {
            // Fetch the access token from localStorage
            const accessToken = localStorage.getItem('spotifyAccessToken');
            const refreshToken = localStorage.getItem('spotifyRefreshToken');

            // Ensure that the access token is available
            if (!accessToken) {
                console.error('Access token not available. Please authenticate with Spotify.');
                return;
            }

            // Construct the request body with selected option, typed value, and access token
            const requestBody = {
                feature: 'discover',
                option: getTabOption(selectedTab),
                value: description,
                bpm: bpm,
                quantity: numberOfMusics,
                access_token: accessToken, // Include the access token in the request body
                refresh_token: refreshToken, // Include the access token in the request body
                // Add more fields as needed
            };
            // Call your serverless function using fetch
            const response = await fetch('/api/schelas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            // Replace this with your actual handling of the response data
            alert(`${JSON.stringify(data.message)}`);
        } catch (error) {
            console.error('Error calling serverless function:', error);
        } finally {
            setShowLoader(false)
        }
    };


    // Helper function to get the option based on the selected tab
    const getTabOption = (tabIndex) => {
        switch (tabIndex) {
            case 0:
                return 'artist';
            case 1:
                return 'genre';
            case 2:
                return 'current';
            case 3:
                return 'bpm';
            default:
                return ''; // Handle default case if needed
        }
    };

    return (
        (logged &&
            <div className="flex flex-col items-center">
                <Tabs onSelect={(index) => setSelectedTab(index)}>
                    <TabList className="flex bg-black p-4 rounded-lg mb-4">
                        <Tab className="cursor-pointer p-2 bg-green rounded-md">Artists</Tab>
                        <Tab className="cursor-pointer p-2 bg-green rounded-md">Genre</Tab>
                        <Tab className="cursor-pointer p-2 bg-green rounded-md">Current</Tab>
                        <Tab className="cursor-pointer p-2 bg-green rounded-md">BPM</Tab>
                    </TabList>

                    {/* Artists Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-white">Type in the Artists:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-black"
                        />
                    </TabPanel>

                    {/* Genre Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-white">Choose a Genre:</label>
                        <select
                            multiple

                            className="mb-4 w-full p-2 rounded-md text-black"
                            value={description.split(',')}
                            style={{ height: '150px' }}
                            onChange={(e) => setDescription(Array.from(e.target.selectedOptions?.slice(0, 5), option => option.value).join(','))}
                        >
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </TabPanel>

                    {/* Current Tab */}
                    <TabPanel>

                    </TabPanel>

                    {/* BPM Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-white">BPM:</label>
                        <input
                            type="number"
                            value={bpm}
                            onChange={(e) => setBpm(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-black"
                        />
                        <label className="block mb-2 text-white">Type in the Artists:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-black"
                        />
                    </TabPanel>
                </Tabs>

                {/* Number of Musics field */}
                <label className="block mb-2 text-white">Number of Musics:</label>
                <input
                    type="number"
                    value={numberOfMusics}
                    onChange={(e) => setNumberOfMusics(e.target.value)}
                    className="mb-4 w-full p-2 rounded-md text-black"
                />

                {/* Button for generating playlist */}
                <div className="bg-green text-white p-2 rounded-md cursor-pointer">
                    <Button
                        text='Generate My Playlist'
                        loading={showLoader}
                        disabled={showLoader}
                        onClick={generatePlaylist}
                    ></Button>
                </div>
            </div >
        )
    );
};

export default SearchScreen;
