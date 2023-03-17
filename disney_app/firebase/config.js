// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbpoyQfvjMXwW4nLLy5eNBQcNBqyGBiSU",
  authDomain: "disneyapp-ace26.firebaseapp.com",
  projectId: "disneyapp-ace26",
  storageBucket: "disneyapp-ace26.appspot.com",
  messagingSenderId: "726268711828",
  appId: "1:726268711828:web:cf7470a80f908826c9f581"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
const auth = firebase.auth();
const db = getFirestore(app);

export { auth, app, db, getFirestore, doc, setDoc, getDoc, updateDoc };