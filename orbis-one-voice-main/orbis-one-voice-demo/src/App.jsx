
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useSpeechSynthesis } from 'react-speech-kit';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
    const [user, setUser] = useState(null);
    const [lang, setLang] = useState('en');
    const { speak } = useSpeechSynthesis();

    useEffect(() => {
        if (user) {
            speak({ text: `Hello ${user.name}, I am your Orbis One guide.`, lang });
        }
    }, [user, lang]);

    const handleLoginSuccess = (credentialResponse) => {
        const userObject = { name: 'User' }; // Normally, decode JWT here
        setUser(userObject);
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            {!user ? <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} /> :
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
                <option value='en'>English</option>
                <option value='hi'>Hindi</option>
            </select>}
        </GoogleOAuthProvider>
    );
}

export default App;
