import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// main PET_PLANET

const firebaseConfig = {
  apiKey: "AIzaSyBlA6LWKSY6KOzKvpG0bQTXF-3Mr9Pxu5A",
  authDomain: "pet-planet-app.firebaseapp.com",
  projectId: "pet-planet-app",
  storageBucket: "pet-planet-app.appspot.com",
  messagingSenderId: "630307086662",
  appId: "1:630307086662:web:373f4736e6608395f5c547",
  measurementId: "G-YBPRF2N6CR"
};

// Duplicate PET_PLANET

// const firebaseConfig = {
//   apiKey: "AIzaSyCaIpOW2_zwKfkPllWhHq5nA7t_HQrsCV0",
//   authDomain: "pet-planet-secondary.firebaseapp.com",
//   projectId: "pet-planet-secondary",
//   storageBucket: "pet-planet-secondary.appspot.com",
//   messagingSenderId: "852005289493",
//   appId: "1:852005289493:web:35a7c692eb9cc4edb1d81c",
//   measurementId: "G-VC2TF5BS3Y",
// };

// Duplicate PET_PLANET

// const firebaseConfig = {
//   apiKey: "AIzaSyCUvt-mlb8UIYHfFUKn88eTSPUABrQroOU",
//   authDomain: "pet-planet-bypass.firebaseapp.com",
//   projectId: "pet-planet-bypass",
//   storageBucket: "pet-planet-bypass.appspot.com",
//   messagingSenderId: "370626904825",
//   appId: "1:370626904825:web:b7802b9ef170b6af9b5828",
//   measurementId: "G-QR8PS7Z9QY",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
