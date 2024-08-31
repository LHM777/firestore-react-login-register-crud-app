import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // This effect sets up a listener for authentication state changes
    // It runs once when the component mounts and cleans up when it unmounts
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Update auth state based on user presence
      setIsLoading(false); // Set loading to false once we have the auth state
    });

    // Authentication state persists across page refreshes because:
    // 1. Firebase stores the auth token in browser storage (localStorage or indexedDB)
    // 2. On page load, Firebase checks this stored token
    // 3. If a valid token exists, the onAuthStateChanged listener fires with the user object
    // 4. This updates the app state, maintaining the user's authenticated status

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
