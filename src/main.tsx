import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'tailwindcss/tailwind.css';

import { AuthProvider } from 'src/context/AuthProvider/AuthProvider';
import { GameProvider } from 'src/context/GameProvider/GameProvider';
import { SettingsProvider } from 'src/context/SettingsProvider/SettingsProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <SettingsProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </SettingsProvider>
    </AuthProvider>
  </React.StrictMode>
);
