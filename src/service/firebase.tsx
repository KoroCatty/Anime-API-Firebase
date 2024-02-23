// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// firestore (DB for News)
import { getFirestore } from "firebase/firestore";

// dot env をviteで使うにはこのようにするには下記のように記載
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
const auth = getAuth(app);

// Google provider (クリックした際アカウントがポップアップして選べるようにするもの)
const provider = new GoogleAuthProvider();

// fire store
const db = getFirestore(app);

// export 各モジュール
export { auth, provider, db };
