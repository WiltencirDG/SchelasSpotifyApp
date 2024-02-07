// pages/callback.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/Header';

const loginSchelas = async (code) => {
    if (!code) return

    const requestBody = {
        feature: 'login',
        code: code
    };
    const response = await fetch('/api/schelas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if(response.ok){
        const user = await response.json();
        return user.data;
    }else {
        console.error('Failed to fetch user data from Spotify API:', response.status, response.statusText);
        return null;
    }
};

const CallbackPage = () => {
    const router = useRouter();

    useEffect(() => {
        const { code, error } = router.query;

        const handleCallback = async (code) => {
            if (error || !code) {
                localStorage.removeItem('spotifyUserName');
                localStorage.removeItem('spotifyUserImage');
                router.push('/');
                return
            }
            const response = await loginSchelas(code)
            const user = response.body
            if (user != null) {
                // Save the user's name
                localStorage.setItem('spotifyUserName', user ? user?.display_name : "Visitante");
                localStorage.setItem('spotifyUserImage', user?.images[0]?.url);

                // Redirect the user back to the app's index page
                router.push('/');
                return
            }
        };

        handleCallback(code);
    }, [router.query]);

    return (
        <div className="bg-primary text-playlist flex flex-col h-full min-h-screen">
            <Header />
            
            <main className="flex flex-1 p-5 gap-2 items-center justify-center text-center">
                <section>
                    <h2 className="text-2xl font-bold mb-5">Você fez login com sucesso.</h2>
                    <p className="text-lg">Agora você pode continuar a usar o aplicativo.</p>
                </section>
            </main>

            <footer className="flex-2 p-5 text-center bg-black bg-opacity-60 text-zinc-400">
                <p>Feito com ❤️ @ Schelas</p>
            </footer>
        </div>
    );
};

export default CallbackPage;
