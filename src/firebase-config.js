// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlA6LWKSY6KOzKvpG0bQTXF-3Mr9Pxu5A",
  authDomain: "pet-planet-app.firebaseapp.com",
  projectId: "pet-planet-app",
  storageBucket: "pet-planet-app.appspot.com",
  messagingSenderId: "630307086662",
  appId: "1:630307086662:web:373f4736e6608395f5c547",
  measurementId: "G-YBPRF2N6CR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
