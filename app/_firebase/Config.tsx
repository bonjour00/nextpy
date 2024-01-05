import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBoEFMFuggq04qTc37GeLghmIRzbdGBJAI",
  authDomain: "next-flask.firebaseapp.com",
  projectId: "next-flask",
  storageBucket: "next-flask",
  messagingSenderId: "212636162363",
  appId: "1:212636162363:web:018fef055f82f753d43f1e",
};
// Initialize Firebase App
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
