import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDFOOoKzWAMHXH2xWrjCJQO0BvOW2wFXKY",
  authDomain: "python-flask-69655.firebaseapp.com",
  projectId: "python-flask-69655",
  storageBucket: "python-flask-69655.appspot.com",
  messagingSenderId: "34078982231",
  appId: "1:34078982231:web:50126ce49b578c4c4c2312",
};
// Initialize Firebase App
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
