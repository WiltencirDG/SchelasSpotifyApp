// components/Header.js

import IconS4S from './IconS4S';
import SpotifyLoginButton from './SpotifyLoginButton';

const Header = () => {

    return (
        <header className="bg-black p-2 flex flex-row justify-between">
            {/* <Image src="/logo.png" width={150} height={150} alt="Schelas for Spotify" className="max-w-40" /> */}
            <IconS4S className="fill-primary" width={150} height={80}></IconS4S>
            {/* <Image src="/logo.png" width={150} height={150} alt="Schelas for Spotify" className="max-w-40" /> */}
            <SpotifyLoginButton />
        </header>
    );
};

export default Header;
