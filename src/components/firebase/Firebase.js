import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyApFQ-tcQcKWdQtwtsV0Z6-dF_v2cDjfMs",
    authDomain: "myblog-94051.firebaseapp.com",
    databaseURL: "https://myblog-94051-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "myblog-94051",
    storageBucket: "myblog-94051.appspot.com",
    messagingSenderId: "212129985563",
    appId: "1:212129985563:web:7042d3b676efa74981f4be",
    measurementId: "G-CGCEN5GSPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);