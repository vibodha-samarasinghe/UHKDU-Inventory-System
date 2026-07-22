import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {

  apiKey: "AIzaSyBz83fXpJPSbsPvQDgPVTUhPQLfhfsGcds",

  authDomain: "uhkdu-inventory-system.firebaseapp.com",

  projectId: "uhkdu-inventory-system",

  storageBucket: "uhkdu-inventory-system.firebasestorage.app",

  messagingSenderId: "942048112441",

  appId: "1:942048112441:web:3607fa041958f188a442e8",

  measurementId: "G-HBQF3C876D"

};





const app = initializeApp(firebaseConfig);





// Firebase Authentication

export const auth = getAuth(app);





// Google Login Provider

export const googleProvider = new GoogleAuthProvider();