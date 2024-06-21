
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyAhd415eNqf9GWGSrpSZ0bSI0t22eOVXnc",
    authDomain: "podpulse-c3b49.firebaseapp.com",
    projectId: "podpulse-c3b49",
    storageBucket: "podpulse-c3b49.appspot.com",
    messagingSenderId: "759082203590",
    appId: "1:759082203590:web:745fabd8b68b2cc8429ac7",
    measurementId: "G-WJT0Z4FJBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged };
