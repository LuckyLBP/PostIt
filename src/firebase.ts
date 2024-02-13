// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3KO-ymrMGfFmlFdob7k9acebYjy6u5rY",
  authDomain: "noteit-cf195.firebaseapp.com",
  projectId: "noteit-cf195",
  storageBucket: "noteit-cf195.appspot.com",
  messagingSenderId: "1089436217841",
  appId: "1:1089436217841:web:53da9f17e5d88fd0f69450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)