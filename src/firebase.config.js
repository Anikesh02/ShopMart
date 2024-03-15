
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuiVpPky5vCZrk3sRyspAOvXOVix9mIhE",
  authDomain: "shopmart-63dec.firebaseapp.com",
  projectId: "shopmart-63dec",
  storageBucket: "shopmart-63dec.appspot.com",
  messagingSenderId: "166965061702",
  appId: "1:166965061702:web:40f2dd2ddebdf3272ec247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;