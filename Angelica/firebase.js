import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6bN7lFthDbnVzm4tA6q5DfGORBWBvOcg",
  authDomain: "angelica-mameloco.firebaseapp.com",
  databaseURL: "https://angelica-mameloco-default-rtdb.firebaseio.com",
  projectId: "angelica-mameloco",
  storageBucket: "angelica-mameloco.appspot.com",
  messagingSenderId: "985933442714",
  appId: "1:985933442714:web:7bf1cf13533aba31df7923",
  measurementId: "G-8ZVRWH9BMF"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
