
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth" 


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-8376d.firebaseapp.com",
  projectId: "loginonecart-8376d",
  storageBucket: "loginonecart-8376d.firebasestorage.app",
  messagingSenderId: "341114660655",
  appId: "1:341114660655:web:179a9e9b9578dabe14a3da"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const  provider= new GoogleAuthProvider()


export {auth , provider}