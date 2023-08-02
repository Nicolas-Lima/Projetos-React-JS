import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDg4ECa1fbB9CnPWgqY6GC03mmMPxM4GLM",
  authDomain: "tickets-c1c94.firebaseapp.com",
  projectId: "tickets-c1c94",
  storageBucket: "tickets-c1c94.appspot.com",
  messagingSenderId: "1076128067547",
  appId: "1:1076128067547:web:93dd31441385df4fcd41fe",
  measurementId: "G-7WWLD45FHG",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
