import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.tsx';
import './input.css';
import AuthProvider from './context/AuthProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
