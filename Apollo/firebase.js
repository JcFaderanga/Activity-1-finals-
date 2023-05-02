import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNbEDj6asYV-r_zmPwKnZoMQ89w5OcHyw",
  authDomain: "finals-act1.firebaseapp.com",
  databaseURL: "https://finals-act1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "finals-act1",
  storageBucket: "finals-act1.appspot.com",
  messagingSenderId: "682448983384",
  appId: "1:682448983384:web:f4d2ce293d31026ead012d",
  measurementId: "G-GFXLKJK37Z",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
