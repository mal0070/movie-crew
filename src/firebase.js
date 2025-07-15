import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

// Firebase 설정 객체
const firebaseConfig = {
    apiKey: "AIzaSyBmoTTkcNkMMkGbRPHtEk_-Gs4tfeycgu8",
    authDomain: "movie-crew-7cb12.firebaseapp.com",
    projectId: "movie-crew-7cb12",
    storageBucket: "movie-crew-7cb12.firebasestorage.app",
    messagingSenderId: "489605505134",
    appId: "1:489605505134:web:8206a9b8eb59b52a67867f",
    measurementId: "G-YNBQXF9B0P"
  };

// Firebase 초기화
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Firebase 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;