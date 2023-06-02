// ! 9
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDv6--bRTMy6VS2Yx6xtTZ7VrLvcsmd5IU",
  authDomain: "eshop-2945f.firebaseapp.com",
  projectId: "eshop-2945f",
  storageBucket: "eshop-2945f.appspot.com",
  messagingSenderId: "828237424697",
  appId: "1:828237424697:web:307c3ed62a8d7eb364c5e8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app