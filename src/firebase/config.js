import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyC8cHUwxohc6C9jdJihc8Q8vbvRQ0t_0",
  authDomain: "react-entertainment-app-7f977.firebaseapp.com",
  projectId: "react-entertainment-app-7f977",
  storageBucket: "react-entertainment-app-7f977.appspot.com",
  messagingSenderId: "677511221557",
  appId: "1:677511221557:web:2547a7bc756ed755aefc7c",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Initialize storage
const storage = getStorage();

// Initialize Authentication
const auth = getAuth();

export { db, auth, storage };
