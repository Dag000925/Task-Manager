// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYWV92TnQZ_5cN6PcFZeqRFianM5tWoLY",
  authDomain: "taskmanager-f6ad6.firebaseapp.com",
  projectId: "taskmanager-f6ad6",
  storageBucket: "taskmanager-f6ad6.appspot.com",
  messagingSenderId: "197355492165",
  appId: "1:197355492165:web:db48c8ee5484515776a42c",
  measurementId: "G-FXXNCL956P"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//const analytics = getAnalytics(app);