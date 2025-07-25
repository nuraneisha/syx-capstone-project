// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAchib5SuPxxNTRUB_Zxk49DI8E_Awfws",
    authDomain: "syx-capstoneproject.firebaseapp.com",
    projectId: "syx-capstoneproject",
    storageBucket: "syx-capstoneproject.firebasestorage.app",
    messagingSenderId: "438448189304",
    appId: "1:438448189304:web:c3a794d82f4db805ca628d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);