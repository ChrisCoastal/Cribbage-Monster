import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns';

// needs to be added for Firebase Auth on localhost
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src'
    }
  }
});
