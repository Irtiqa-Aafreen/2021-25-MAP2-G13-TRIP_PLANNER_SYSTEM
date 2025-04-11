// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth from firebase/auth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB85op00nnBTvbNiakFnifSsZk8d_eR8e8",
  authDomain: "trip-planner-914f2.firebaseapp.com",
  projectId: "trip-planner-914f2",
  storageBucket: "trip-planner-914f2.appspot.com",
  messagingSenderId: "445407483522",
  appId: "1:445407483522:web:15bf47396284b681dec69b",
  measurementId: "G-RGQKFMEHQ0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

