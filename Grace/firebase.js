import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXzXTCdgw7rVPQEIxTMUCdcV6uqyTNzCY",
  authDomain: "grace-santarin.firebaseapp.com",
  databaseURL: "https://grace-santarin-default-rtdb.firebaseio.com",
  projectId: "grace-santarin",
  storageBucket: "grace-santarin.appspot.com",
  messagingSenderId: "326627359317",
  appId: "1:326627359317:web:a53cbf805a67bba7b232dc",
  measurementId: "G-DTX1Q4JFQ0"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
