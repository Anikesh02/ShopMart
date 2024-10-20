
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEvyur7XjTbDWkUlYwrlVtXMaNcL0-tZQ",
  authDomain: "shopmartnew-9631b.firebaseapp.com",
  projectId: "shopmartnew-9631b",
  storageBucket: "shopmartnew-9631b.appspot.com",
  messagingSenderId: "370438331439",
  appId: "1:370438331439:web:d974f202db380b2bfbbada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;