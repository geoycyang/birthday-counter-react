import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js'
import {getDatabase, ref, set, child, get, remove } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js'




const firebaseConfig = {
    apiKey: "AIzaSyDxm1Wd6ADtbAezHE5wDM2XCCWerrsASrA",
    authDomain: "birthdayclub-86706.firebaseapp.com",
    databaseURL: "https://birthdayclub-86706-default-rtdb.firebaseio.com",
    projectId: "birthdayclub-86706",
    storageBucket: "birthdayclub-86706.appspot.com",
    messagingSenderId: "242086551734",
    appId: "1:242086551734:web:84bb6588ad8189dcec0617",
    measurementId: "G-NJJM6TT6B0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getDatabase(app)

export {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
        db, ref, set, child, get, remove}