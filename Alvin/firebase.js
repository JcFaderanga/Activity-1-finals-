import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDIEPoUA2G09IG87_ZpMQJYNWtVx9tUNIk",
  authDomain: "alvin-bismar.firebaseapp.com",
  projectId: "alvin-bismar",
  storageBucket: "alvin-bismar.appspot.com",
  messagingSenderId: "983733218049",
  appId: "1:983733218049:web:bb68ebbe89c2e0ba6a0900",
  measurementId: "G-G05W56ZYWE"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
