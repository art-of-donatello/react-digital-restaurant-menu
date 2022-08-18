// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxws6Q7gXSEojmErwfP2YAbG_tBPaNAIQ",
  authDomain: "mywebsite-62e8c.firebaseapp.com",
  databaseURL: "https://mywebsite-62e8c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mywebsite-62e8c",
  storageBucket: "mywebsite-62e8c.appspot.com",
  messagingSenderId: "284601990552",
  appId: "1:284601990552:web:1d971d15c5c8fb3ea87fed",
  measurementId: "G-JQNSPQ67M6"
};


const app = getApps.length>0?getApp(): initializeApp(firebaseConfig);

const db = getFirestore(app);

const stograge = getStorage(app);

export {app,db,stograge};