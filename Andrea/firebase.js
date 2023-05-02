import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAnCMCBLwpwo3zaSIPDyL7qYll30m0d4ls",
  authDomain: "matabuena-act1.firebaseapp.com",
  projectId: "matabuena-act1",
  storageBucket: "matabuena-act1.appspot.com",
  messagingSenderId: "1093553223130",
  appId: "1:1093553223130:web:c4b863e2dd5f4645d97ce3",
  measurementId: "G-9HR614VZNY"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
