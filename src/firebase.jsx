// src/firebase.jsx or src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Correct import for authentication

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyCU7lv29h4_J9xfS1pW7CLzHdEUEGoNVxI",
    authDomain: "car-wash-1fa5f.firebaseapp.com",
    projectId: "car-wash-1fa5f",
    storageBucket: "car-wash-1fa5f.firebasestorage.app",
    messagingSenderId: "529966076378",
    appId: "1:529966076378:web:7aec10e40b330723fff0e3",
    measurementId: "G-9RPN9YVQ0F"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app); // This initializes Firebase Authentication

// Export the auth object for use in other components
export { auth };
