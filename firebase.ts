// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration (use your own Firebase credentials here)
const firebaseConfig = {
  apiKey: "AIzaSyBqGV0M3Geh2-ON3aPlBCPWvfY7-VVisoU",
  authDomain: "futsal-management-system-6fe39.firebaseapp.com",
  projectId: "futsal-management-system-6fe39",
  storageBucket: "futsal-management-system-6fe39.firebasestorage.app",
  messagingSenderId: "1072935783497",
  appId: "1:1072935783497:web:9a9f99e29939ab23748398",
  measurementId: "G-B4W79E9FE4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };
