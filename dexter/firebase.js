import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoJ7R7hfw7EArNWq9m2Y8WKpUPOQ5aL-g",
    authDomain: "dexter-maguila.firebaseapp.com",
    projectId: "dexter-maguila",
    storageBucket: "dexter-maguila.appspot.com",
    messagingSenderId: "596040972359",
    appId: "1:596040972359:web:511dfcaa9b718900ff5962",
    measurementId: "G-22C8BVG3V8"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);