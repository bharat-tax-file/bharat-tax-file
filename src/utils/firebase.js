// ✅ utils/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeRL9m-PaI8If419YMm2HX7NBtNcEdXCI",
  authDomain: "bharat-tax-file.firebaseapp.com",
  projectId: "bharat-tax-file",
  storageBucket: "bharat-tax-file.appspot.com",
  messagingSenderId: "517875734348",
  appId: "1:517875734348:web:86ea718a84fdd4d4b9e1e9",
  measurementId: "G-5JYX70RTG5"
};

// ✅ Prevent duplicate app initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
