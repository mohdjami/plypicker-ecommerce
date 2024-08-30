// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAgrW6FKIFLjUiqzH-e7obHV-_S3J1WuVw",
  authDomain: "plypicker-6b557.firebaseapp.com",
  projectId: "plypicker-6b557",
  storageBucket: "plypicker-6b557.appspot.com",
  messagingSenderId: "641603259974",
  appId: "1:641603259974:web:a38ac2032960562748c447",
  measurementId: "G-FGMJ6DZWEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage };
