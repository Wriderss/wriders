import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpdv3Kc_PaAtu_ictHK2ygQhg4YFa-fzA",
  authDomain: "wrider-b4f69.firebaseapp.com",
  projectId: "wrider-b4f69",
  storageBucket: "wrider-b4f69.appspot.com",
  messagingSenderId: "436074190875",
  appId: "1:436074190875:web:2fd0692c354b54765780be",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
