// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth  } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCdYmbBzm85t7b8XDwRXLgPfG86kk7m-IM",
    authDomain: "quanlybanhang-faaa3.firebaseapp.com",
    databaseURL: "https://quanlybanhang-faaa3-default-rtdb.firebaseio.com",
    projectId: "quanlybanhang-faaa3",
    storageBucket: "quanlybanhang-faaa3.appspot.com",
    messagingSenderId: "202315621382",
    appId: "1:202315621382:web:84401b236b01ba7236cf87",
    measurementId: "G-069WB4RGC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
