// components/SearchScreen.js

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Button } from '../components'
import MusicCard from './MusicCard';
import IconS4S from './IconS4S';

const SearchScreen = () => {
    const [description, setDescription] = useState('');
    const [bpm, setBpm] = useState('');
    const [logged, setLogged] = useState(false);
    const [songs, setSongs] = useState([]);
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
            // Fill in the list of songs
            setSongs(data.data)
            // Replace this with your actual handling of the response data
            // alert(`${JSON.stringify(data.message)}`);
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
            <div className="flex flex-col items-center w-full">
                <div className='mb-4'>
                    <IconS4S color="playlist" height={150}></IconS4S>
                </div>
                <Tabs onSelect={(index) => { setSelectedTab(index); setDescription(''); setBpm('') }} >
                    <TabList className="flex p-4 rounded-lg mb-4 text-playlist">
                        <Tab className="cursor-pointer p-2 bg-fields text-white hover:bg-hover rounded-md">Artistas</Tab>
                        <Tab className="cursor-pointer p-2 bg-fields text-white hover:bg-hover rounded-md">Gêneros</Tab>
                        <Tab className="cursor-pointer p-2 bg-fields text-white hover:bg-hover rounded-md">Música Atual</Tab>
                        <Tab className="cursor-pointer p-2 bg-fields text-white hover:bg-hover rounded-md">BPM</Tab>
                    </TabList>

                    {/* Artists Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-playlist">Digite os Artistas:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-white bg-fields"
                        />
                    </TabPanel>

                    {/* Genre Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-playlist">Escolha os Gêneros:</label>
                        <select
                            multiple
                            className="mb-4 w-full p-2 rounded-md text-white bg-fields"
                            value={description.split(',')}
                            style={{ height: '150px' }}
                            onChange={(e) => setDescription(Array.from(e.target.selectedOptions, option => option.value).slice(0, 5).join(','))}
                        >
                            {genres?.map((genre) => (
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
                        <label className="block mb-2 text-playlist">BPM:</label>
                        <input
                            type="number"
                            value={bpm}
                            onChange={(e) => setBpm(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-white bg-fields"
                        />
                        <label className="block mb-2 text-playlist">Digite os Artistas:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-white bg-fields"
                        />
                    </TabPanel>

                    {/* Number of Musics field */}
                    <div className="w-full">
                        <label className="block mb-2 text-playlist">Nº de músicas:</label>
                        <input
                            type="number"
                            value={numberOfMusics}
                            onChange={(e) => setNumberOfMusics(e.target.value)}
                            className="mb-4 p-2 w-full rounded-md text-white bg-fields"
                        />
                    </div>
                    {/* Button for generating playlist */}
                    <div className="mt-4 bg-buttons text-white p-2 rounded-md cursor-pointer hover:bg-hover w-full text-center">
                        <Button
                            text='Gerar Playlist'
                            loading={showLoader}
                            disabled={showLoader}
                            onClick={generatePlaylist}
                        ></Button>
                    </div>
                </Tabs>



                {(songs.length > 0 &&
                    <section className="mt-10 w-3/5">
                        <h2 className="text-2xl font-bold mb-5">Sua playlist gerada ({songs.length} músicas):</h2>
                        {songs.map((music) => (
                            <MusicCard key={music.id} music={music} />
                        ))}
                    </section>
                )}
            </div >
        )
    );
};

export default SearchScreen;
