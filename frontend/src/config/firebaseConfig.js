import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Ensure this matches your SDK version
import { getStorage } from "firebase/storage"; // Ensure you import from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAhv_AbsaxISZWvM4ucatwoYEAQAgLN3fs",
    authDomain: "travelsri-e041e.firebaseapp.com",
    projectId: "travelsri-e041e",
    storageBucket: "travelsri-e041e.firebasestorage.app",
    messagingSenderId: "450527793625",
    appId: "1:450527793625:web:6e930cfe42f364961749c8",
    measurementId: "G-GSX5SDF8DV"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage with the app
export const db = getFirestore(app);
export const storage = getStorage(app);
