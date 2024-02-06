// pages/_app.js
import '@radix-ui/themes/styles.css';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    // return <Component {...pageProps} />;
    
    return (<div className='bg-primary'>
        <Head>
            <title>Schelas for Spotify | Wilt</title>
        </Head>
        <Component {...pageProps} />;
    </div>)
         
}


export default MyApp;