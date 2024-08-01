// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyR4HKhgBvRhI99sxWRIMhcq9DlBQwl4c',
  authDomain: 'fin-track-980a2.firebaseapp.com',
  projectId: 'fin-track-980a2',
  storageBucket: 'fin-track-980a2.appspot.com',
  messagingSenderId: '67248051771',
  appId: '1:67248051771:web:00ade939f10166ff976e1e',
  measurementId: 'G-W4W9TYZGW3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
