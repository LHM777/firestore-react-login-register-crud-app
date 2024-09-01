import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDb } from '../../config/firestore';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const initializeFirebaseAndAuth = async () => {
      await getDb();  // Initialize Firebase
      const auth = getAuth();
      return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsAuthenticated(!!user);
          setIsLoading(false);
          resolve(unsubscribe);
        });
      });
    };

    let unsubscribe;
    initializeFirebaseAndAuth().then(unsubscribeFunc => {
      unsubscribe = unsubscribeFunc;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div></div>; // Or a loading spinner
  }

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : isRegistering ? (
        <Register 
          setIsRegistering={setIsRegistering} 
          setIsAuthenticated={setIsAuthenticated}
        />
      ) : (
        <Login 
          setIsAuthenticated={setIsAuthenticated} 
          setIsRegistering={setIsRegistering} 
        />
      )}
    </>
  );
};

export default App;
