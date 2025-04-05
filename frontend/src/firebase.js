// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxs0M8tt-ftS-ipoE0XvqyIJO9a6_bp7k",
    authDomain: "video-platform-b8226.firebaseapp.com",
    projectId: "video-platform-b8226",
    storageBucket: "video-platform-b8226.firebaseapp.com",
    messagingSenderId: "318637734042",
    appId: "1:318637734042:web:b1d26be7712c7594f50723"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
