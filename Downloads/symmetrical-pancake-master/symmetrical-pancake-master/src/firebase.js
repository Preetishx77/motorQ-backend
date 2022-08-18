import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBD0mNMnUdjxCDmFOYjgi_xWXBY9ivnBq8",
  authDomain: "motorq-8ec44.firebaseapp.com",
  projectId: "motorq-8ec44",
  storageBucket: "motorq-8ec44.appspot.com",
  messagingSenderId: "981715030377",
  appId: "1:981715030377:web:de3405e6821d7892ac2df8",
  measurementId: "G-YF6T99QSZD"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;