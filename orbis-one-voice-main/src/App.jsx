import { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

export default function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('');
  
  const speak = (text, lang = 'en-IN') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  const onLoginSuccess = (credentialResponse) => {
    const decoded = jwt_decode(credentialResponse.credential);
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    });
  };

  const onLanguageSelect = (e) => {
    setLanguage(e.target.value);
    if (user) {
      const welcomeText = `Welcome, ${user.name}, to Orbis One.`;
      speak(welcomeText, e.target.value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!user ? (
        <GoogleLogin onSuccess={onLoginSuccess} onError={() => console.log("Login Failed")} />
      ) : (
        <div className="text-center">
          <h1 className="text-xl font-bold">Hello, {user.name}!</h1>
          <img src={user.picture} alt="User" className="rounded-full w-20 h-20 mx-auto my-4" />
          <p className="text-gray-600">{user.email}</p>

          <select onChange={onLanguageSelect} className="mt-4 p-2 border rounded">
            <option value="">Select Language</option>
            <option value="en-IN">English (India)</option>
            <option value="hi-IN">Hindi</option>
            <option value="bn-IN">Bengali</option>
            <option value="te-IN">Telugu</option>
            <option value="ta-IN">Tamil</option>
            <option value="gu-IN">Gujarati</option>
            <option value="kn-IN">Kannada</option>
            <option value="ml-IN">Malayalam</option>
            <option value="mr-IN">Marathi</option>
            <option value="pa-IN">Punjabi</option>
          </select>

          <button
            onClick={() => googleLogout() && setUser(null)}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

