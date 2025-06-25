// config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyACGz19YMM7AQ4wuS0Dg9tcn_OQOZVuJ_c",
    authDomain: "travel-sri.firebaseapp.com",
    projectId: "travel-sri",
    storageBucket: "travel-sri.appspot.com",
    messagingSenderId: "575625933858",
    appId: "1:575625933858:web:643e0d2b67c424a74e867b",
    measurementId: "G-6CK30DHW2H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

// Listen to messages when the app is in the foreground
onMessage(messaging, (payload) => {
    console.log('Message received: ', payload);
    alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
});
