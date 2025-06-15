import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const languages = {
  Hindi: 'नमस्ते',
  English: 'Hello',
  Tamil: 'வணக்கம்',
  Telugu: 'నమస్కారం',
  Kannada: 'ನಮಸ್ಕಾರ',
  Malayalam: 'നമസ്കാരം',
  Marathi: 'नमस्कार',
  Gujarati: 'નમસ્તે',
  Punjabi: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
  Bengali: 'নমস্কার',
  Odia: 'ନମସ୍କାର',
  Assamese: 'নমস্কাৰ',
  Urdu: 'سلام',
  Bhojpuri: 'प्रणाम',
};

const App = () => {
  const [userName, setUserName] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');

  const speak = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = 'hi-IN'; // India voice
    speechSynthesis.speak(utterance);
  };

  const greetUser = () => {
    const greeting = languages[selectedLang] || languages['English'];
    const fullGreeting = `${greeting} ${userName}! Welcome to Orbis One.`;
    speak(fullGreeting);
  };

  useEffect(() => {
    if (userName) greetUser();
  }, [userName, selectedLang]);

  return (
    <GoogleOAuthProvider clientId="453455645323-abcxyz12345.apps.googleusercontent.com">
      <div className="p-4 text-center min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Orbis One Voice</h1>
        {!userName ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwt_decode(credentialResponse.credential);
              setUserName(decoded.name);
            }}
            onError={() => console.log('Login Failed')}
          />
        ) : (
          <>
            <p className="mb-2">Welcome, {userName}!</p>
            <select
              className="border p-2 rounded"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              {Object.keys(languages).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
