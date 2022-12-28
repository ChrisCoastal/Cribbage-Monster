import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'tailwindcss/tailwind.css';

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
