// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
//const analytics = getAnalytics(app);