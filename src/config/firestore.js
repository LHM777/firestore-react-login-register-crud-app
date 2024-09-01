import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let firebaseConfig = null;

const initializeFirebase = async () => {
  if (!firebaseConfig) {
    const response = await fetch('/api/getConfig');
    firebaseConfig = await response.json();
  }
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
};

export const getDb = async () => {
  return await initializeFirebase();
};