import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbAIs79csiW7jhh6S9Wt40Y0Xp-WAsZP0",
  authDomain: "adan-joshua.firebaseapp.com",
  databaseURL: "https://adan-joshua-default-rtdb.firebaseio.com",
  projectId: "adan-joshua",
  storageBucket: "adan-joshua.appspot.com",
  messagingSenderId: "818100902785",
  appId: "1:818100902785:web:603b5b5813dc0c70026680",
  measurementId: "G-YQBRPJZW9N"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
