import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = ({ setIsRegistering, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Passwords do not match.',
        showConfirmButton: true,
      });
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: 'success',
        title: 'Registration successful!',
        text: 'You are now logged in.',
        showConfirmButton: false,
        timer: 1500,
      });
      setIsAuthenticated(true);
      setIsRegistering(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <input type="submit" value="Register" />
          <button type="button" onClick={() => setIsRegistering(false)} className="muted-button">
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;