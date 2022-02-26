
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCl1VzHYBOnPWuvYveSuTS6t8FXwjgkaIQ",
  authDomain: "famfood-partner.firebaseapp.com",
  projectId: "famfood-partner",
  storageBucket: "famfood-partner.appspot.com",
  messagingSenderId: "203874276500",
  appId: "1:203874276500:web:753edbc075f3d8354d9081",
  measurementId: "G-XN874YC432"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const analytics = getAnalytics(app);