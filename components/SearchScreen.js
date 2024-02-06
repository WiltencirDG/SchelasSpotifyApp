"use client"
// components/SearchScreen.js

import axios from 'axios';
import { AudioWaveform, Drum, ListPlus, Mic2, Music } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ArtistCard from './ArtistCard';
import IconS4S from './IconS4S';
import MusicCard from './MusicCard';
import Button from './common/Button';

const SearchScreen = () => {
    const [description, setDescription] = useState('');
    const [bpm, setBpm] = useState('');
    const [logged, setLogged] = useState(false);
    const [songs, setSongs] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0); // Track the selected tab
    const [numberOfMusics, setNumberOfMusics] = useState(20); // New state for the number of musics
    const [genres, setGenres] = useState([]); // New state for the genres
    const [artist, setArtist] = useState('');
    const [artistList, setArtistList] = useState([]);
    const [selectedArtists, setSelectedArtists] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);

    const genreOptions = genres.map(genre => ({ value: genre, label: genre }));
    
    const handleGenreChange = (selectedOptions) => {
        if (selectedOptions.length <= 5) {
            setSelectedGenres(selectedOptions);
        }
    };

    const addArtist = (artist) => {
        if (selectedArtists.length < 5) {
            if (!selectedArtists.find(a => a.id === artist.id)) {
                setSelectedArtists([...selectedArtists, artist]);
            }
        } else {
            setArtistList([])
        }
    };

    const removeArtist = (id) => {
        setSelectedArtists(selectedArtists.filter(artist => artist.id !== id));
    };

    useEffect(() => {
        if (artist == '' || artist?.length < 3 || selectedArtists.length >= 5) { setArtistList([]); return; }
        axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=3`, {headers:{"Authorization": "Bearer "+localStorage.getItem('spotifyAccessToken')}})
        .then(res => {
            console.log("Artist", res.data);
            setArtistList(res.data.artists.items);
        })
        .catch(err => console.log(err));
    }, [artist]);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('spotifyUserName') != null) {
            setLogged(true)
        }
    }, [])

    useEffect(() => {
        // Fetch genres from the API when the component mounts
        if (genres.length > 0) return;
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
            var finalValue = description
            if(getTabOption(selectedTab) == 'artist') finalValue = selectedArtists.map(artist => artist.id).join(',')
            if(getTabOption(selectedTab) == 'genre') finalValue = selectedGenres.map(genre => genre.value).join(',')
             
            const requestBody = {
                feature: 'discover',
                option: getTabOption(selectedTab),
                value: finalValue,
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
            setSelectedArtists([])
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
            <div className="flex flex-col items-center">
                <div className='flex flex-col items-center w-full mb-4'>
                    <IconS4S className="fill-black" height={150}></IconS4S>
                    
                </div>
                <Tabs onSelect={(index) => { setSelectedTab(index); setDescription(''); setBpm('') }} >
                    <TabList className="flex md:p-4 md:mb-4 md:gap-3 md:w-full">
                        <Tab className="flex md:gap-3 cursor-pointer p-3 bg-black text-white hover:bg-hover rounded-md"><Mic2 className='hidden md:block'/> Artistas</Tab>
                        <Tab className="flex md:gap-3 cursor-pointer p-3 bg-black text-white hover:bg-hover rounded-md"><AudioWaveform className='hidden md:block'/> Gêneros</Tab>
                        <Tab className="flex md:gap-3 cursor-pointer p-3 bg-black text-white hover:bg-hover rounded-md"><Music className='hidden md:block'/> Música Atual</Tab>
                        <Tab className="flex md:gap-3 cursor-pointer p-3 bg-black text-white hover:bg-hover rounded-md"><Drum className='hidden md:block'/> BPM</Tab>
                    </TabList>

                    {/* Artists Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-playlist">Digite os Artistas:</label>
                        <input
                            type="text"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-white bg-black"
                        />
                        <section className="w-full">
                            {artistList?.map((item) => (
                                <ArtistCard key={item.id} artist={item} onSelect={addArtist}/>
                            ))}
                        </section>  
                        {selectedArtists.length > 0 && (
                            <div>
                                {/* <span>Selecionados: </span> */}
                                {selectedArtists.map(artist => (
                                    <div key={artist.id} className="inline-block bg-black text-white rounded-full px-2 py-1 text-xs font-bold mr-3">
                                        {artist.name}
                                        <button onClick={() => removeArtist(artist.id)} className="ml-2 text-xs">X</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabPanel>

                    {/* Genre Tab */}
                    <TabPanel>
                        <label className="block mb-2 text-playlist">Escolha os Gêneros:</label>
                        <Select
                            unstyled
                            isMulti
                            name="genres"
                            placeholder="Selecione os gêneros..."
                            options={genreOptions}
                            classNames={{
                                control: () => "bg-black rounded-lg hover:cursor-pointer text-white max-w-xl",
                                placeholder: () => "text-white pl-3 py-0.5",
                                container: () => 'rounded-lg hover:cursor-pointer text-white',
                                valueContainer: () => 'bg-black rounded-lg hover:cursor-pointer text-white',
                                input: () => "rounded-lg pl-1 py-0.5", //input de texto
                                valueContainer: () => "rounded-lg p-1 gap-2", //container dos valores
                                multiValue: () => "rounded-lg items-center py-0.5 pl-2 pr-1 gap-1.5",
                                menuList: () => "text-white bg-black rounded-lg py-0.5 pl-2 pr-1 gap-1.5",
                                option: () => "hover:cursor-pointer hover:bg-white hover:text-black px-3 py-2 rounded",
                                multiValueLabel: () => "p-1",
                                multiValueRemove: () => "bg-hover leading-6 p-0.5 hover:bg-red-400 hover:text-playlist text-playlist hover:border-red-300 rounded-full",
                                clearIndicator: () => "bg-black text-white p-1 rounded-md hover:text-hover",
                                dropdownIndicator: () => "p-1 rounded-md hover:text-hover",
                                menu: () => "rounded-lg",
                                indicatorsContainer: () => "p-2 gap-2 bg-black",
                                indicatorSeparator: () => "bg-hover",
                                noOptionsMessage: () => "bg-black text-white p-2 rounded-sm"
                              }}
                            onChange={handleGenreChange}
                            value={selectedGenres}
                        />

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
                            className="mb-4 w-full p-2 rounded-md text-white bg-black"
                        />
                        <label className="block mb-2 text-playlist">Digite os Artistas:</label>
                        <input
                            type="text"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            className="mb-4 w-full p-2 rounded-md text-white bg-black"
                        />
                        <section className="w-full">
                            {artistList?.map((item) => (
                                <ArtistCard key={item.id} artist={item} onSelect={addArtist}/>
                            ))}
                        </section>
                        {selectedArtists.length > 0 && (
                            <div>
                                Artistas selecionados: 
                                {selectedArtists.map(artist => (
                                    <div key={artist.id} className="inline-block bg-black text-white rounded-full px-2 py-1 text-xs font-bold mr-3">
                                        {artist.name}
                                        <button onClick={() => removeArtist(artist.id)} className="ml-2 text-xs">X</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabPanel>

                    {/* Number of Musics field */}
                    <div className="max-w-xl">
                        <label className="block mb-2 text-playlist">Nº de músicas:</label>
                        <input
                            type="number"
                            value={numberOfMusics}
                            onChange={(e) => setNumberOfMusics(e.target.value)}
                            className="mb-4 p-2 max-w-xl w-full rounded-md text-white bg-black"
                        />
                        {/* Button for generating playlist */}
                        
                        <Button
                            text={<div className='gap-2 flex items-center justify-center'><ListPlus/>Gerar Playlist</div>}
                            loading={showLoader}
                            disabled={showLoader}
                            onClick={generatePlaylist}
                        ></Button>
                    </div>

                </Tabs>



                {(songs.length > 0 &&
                    <section className="mt-10 w-full">
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
