// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from 'firebase/firestore'; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGcRvB8Qmqf2ViXEUO_5yQul_Q-bmoVyo",
  authDomain: "myapp-77445.firebaseapp.com",
  projectId: "myapp-77445",
  storageBucket: "myapp-77445.appspot.com",
  messagingSenderId: "450914310461",
  appId: "1:450914310461:web:beb3af30db151304218d54",
  measurementId: "G-MKCDS1DCME"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);