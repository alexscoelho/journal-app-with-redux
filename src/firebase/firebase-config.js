import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyUHitjxEVO0xuubcJkkWqsCU2Mn8U7Nw",
  authDomain: "react-app-curso-56709.firebaseapp.com",
  projectId: "react-app-curso-56709",
  storageBucket: "react-app-curso-56709.appspot.com",
  messagingSenderId: "583255371373",
  appId: "1:583255371373:web:617fb21b388cf267c8d964",
};

initializeApp(firebaseConfig);
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
