import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="453455645323-abcxyz12345.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);