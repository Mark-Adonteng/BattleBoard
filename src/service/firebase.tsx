// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBCaJfYgZzmavIulwkKk1R9kergCSZIyGw",
  authDomain: "battle-board-4de21.firebaseapp.com",
  projectId: "battle-board-4de21",
  storageBucket: "battle-board-4de21.appspot.com",
  messagingSenderId: "516332460365",
  appId: "1:516332460365:web:269ad54e9ecfccd4433f04",
  measurementId: "G-6E1HN0Q3KJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };