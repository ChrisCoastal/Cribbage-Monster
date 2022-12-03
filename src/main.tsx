import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'tailwindcss/tailwind.css';

import { RouterProvider } from 'react-router-dom';
import router from 'src/router/router';
import { AuthProvider } from './context/AuthProvider/AuthProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
