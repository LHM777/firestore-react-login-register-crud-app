import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db = null;

const initializeFirebase = async () => {
  if (!db) {
    const response = await fetch('/api/getConfig');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return db;
};

export const getDb = async () => {
  return await initializeFirebase();
};