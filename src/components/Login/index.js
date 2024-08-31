import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setIsAuthenticated, setIsRegistering }) => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("mypassword");

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Incorrect email or password.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.value)}
        />
        <div className="button-group">
          <button type="button" onClick={handleLogin} className="button">Login</button>
          <button type="button" onClick={() => setIsRegistering(true)} className="button muted-button">Register</button>
        </div>
      </form>
      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        Use these demo credentials to log in and explore the app.
      </p>
    </div>
  );
};

export default Login;
