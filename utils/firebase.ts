// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4xc-rod6G7zpyYB7rKNSJ2m9nIDx0L8w",
  authDomain: "teramic-d7597.firebaseapp.com",
  projectId: "teramic-d7597",
  storageBucket: "teramic-d7597.appspot.com",
  messagingSenderId: "776838876491",
  appId: "1:776838876491:web:01eae09f6e03681f4e2cce",
  measurementId: "G-Y2WXLCHKCT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//export const analytics = getAnalytics(app);
