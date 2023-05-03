import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBXgb69u5ksC88x2ZQuUEdjIVy2YeJZdOA",
  authDomain: "kyrah-pangilinan.firebaseapp.com",
  databaseURL: "https://kyrah-pangilinan-default-rtdb.firebaseio.com",
  projectId: "kyrah-pangilinan",
  storageBucket: "kyrah-pangilinan.appspot.com",
  messagingSenderId: "957947312474",
  appId: "1:957947312474:web:86a25e0b4eaff0c9985b63",
  measurementId: "G-TKEDYSCKET"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
