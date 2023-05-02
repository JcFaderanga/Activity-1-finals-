import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCEDgmGveeGHEvF5S_yxdnOMtTDditCV0A",
  authDomain: "monte-act2f.firebaseapp.com",
  databaseURL: "https://monte-act2f-default-rtdb.firebaseio.com",
  projectId: "monte-act2f",
  storageBucket: "monte-act2f.appspot.com",
  messagingSenderId: "224850067969",
  appId: "1:224850067969:web:93a9bbf28fa1f6e17b7600",
  measurementId: "G-614Z5M9FZ6"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
