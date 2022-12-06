import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppLayout from 'src/router/layouts/AppLayout';

import 'tailwindcss/tailwind.css';

import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider/AuthProvider';
import { GameProvider } from 'src/context/GameProvider/GameProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </AuthProvider>
  </React.StrictMode>
);
