// Firebase init - replace the config object with your project's values
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'REPLACE_ME',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'REPLACE_ME',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'visioncoders-a4b62',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'visioncoders-a4b62.appspot.com',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'REPLACE_ME',
  appId: process.env.VITE_FIREBASE_APP_ID || 'REPLACE_ME'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
