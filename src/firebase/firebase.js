import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqst7JILkkJzG_BeOGfZ84k24kzMdImoo",
  authDomain: "filmy-verse-2d9e8.firebaseapp.com",
  projectId: "filmy-verse-2d9e8",
  storageBucket: "filmy-verse-2d9e8.appspot.com",
  messagingSenderId: "650112918452",
  appId: "1:650112918452:web:7ca4671d3c284fc69ac8e1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db, 'movies');
export const reviewsRef = collection(db, 'reviews');
export default app;