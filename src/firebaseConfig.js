import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAH1J7s_9vn2Cc3b2DUVtoN_dQbCSCSF5Y",
  authDomain: "projet-fin-formation-43760.firebaseapp.com",
  projectId: "projet-fin-formation-43760",
  storageBucket: "projet-fin-formation-43760.appspot.com",
  messagingSenderId: "260482517123",
  appId: "1:260482517123:web:8901459597db4a8926f3b6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app)