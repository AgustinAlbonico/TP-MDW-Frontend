// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFOkf8Tb5BRNlKP7-HrP4a_W4_HQ85Bzs",
  authDomain: "tp-mdw.firebaseapp.com",
  projectId: "tp-mdw",
  storageBucket: "tp-mdw.appspot.com",
  messagingSenderId: "927249688661",
  appId: "1:927249688661:web:5e18d58cc9b31756baccdc",
  measurementId: "G-7L46V4M05V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
