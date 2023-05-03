import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAePVNOOrwoKnZqT3Pxg_IIi0fvSc4KuhU",
  authDomain: "lailanie-2cc0b.firebaseapp.com",
  databaseURL: "https://lailanie-2cc0b-default-rtdb.firebaseio.com",
  projectId: "lailanie-2cc0b",
  storageBucket: "lailanie-2cc0b.appspot.com",
  messagingSenderId: "584944037035",
  appId: "1:584944037035:web:81f4c6f373c64aea081bee",
  measurementId: "G-FST2SDBSYZ"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
