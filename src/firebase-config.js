import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlA6LWKSY6KOzKvpG0bQTXF-3Mr9Pxu5A",
  authDomain: "pet-planet-app.firebaseapp.com",
  projectId: "pet-planet-app",
  storageBucket: "pet-planet-app.appspot.com",
  messagingSenderId: "630307086662",
  appId: "1:630307086662:web:373f4736e6608395f5c547",
  measurementId: "G-YBPRF2N6CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
