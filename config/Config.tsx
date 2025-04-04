import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCDnPU00TbRWVL5nkYv42iEqjfAC4p-oVs",
  authDomain: "prueba-vg.firebaseapp.com",
  databaseURL: "https://prueba-vg-default-rtdb.firebaseio.com",
  projectId: "prueba-vg",
  storageBucket: "prueba-vg.firebasestorage.app",
  messagingSenderId: "944325477424",
  appId: "1:944325477424:web:ddcb3966e706285a5ad9f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);