// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwwQNcMD1gOwh7-imo2SeX8NYrzdtWJHs",
  authDomain: "incit-87418.firebaseapp.com",
  projectId: "incit-87418",
  storageBucket: "incit-87418.appspot.com",
  messagingSenderId: "1008677063192",
  appId: "1:1008677063192:web:16fe35c418fdbcc579916d",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)