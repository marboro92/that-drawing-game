import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "that-drawing-game.firebaseapp.com",
  databaseURL: "https://that-drawing-game.firebaseio.com",
  projectId: "that-drawing-game",
  storageBucket: "that-drawing-game.appspot.com",
  messagingSenderId: "205194317964",
  appId: "1:205194317964:web:aaecc62cacbf0cbdecaba9",
  measurementId: "G-L4G044EQR5",
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const dbFunctions = firebase.functions();
export const dbAnalytics = firebase.analytics();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
