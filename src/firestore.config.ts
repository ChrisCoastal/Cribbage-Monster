import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: 'cribbage-4e43d',
  storageBucket: 'cribbage-4e43d.appspot.com',
  messagingSenderId: '78421518242',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_REALTIME_DB_URL
};

const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app); // firestore
export const rtdb = getDatabase(app); // realtime database
export const firebaseAuth = getAuth();
