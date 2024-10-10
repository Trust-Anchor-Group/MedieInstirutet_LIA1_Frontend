import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Fingerprint } from 'iconoir-react';
import { login } from '../api/base-api.mjs';

// Component for the Login functionality
export const LoginForm = () => {
  // State hooks for managing the form inputs and errors
  const [username, setUsername] = useState(''); // State to handle username input
  const [password, setPassword] = useState(''); // State to handle password input
  const [error, setError] = useState(''); // State to display any errors
  const navigate = useNavigate(); // Hook for programmatic navigation in React Router

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setError(''); // Reset any previous errors

    try {
      await login({ username, password });
      console.log('Login successful:');
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  // Render UI for the login form
  return (
    <>
      {error && <p className="error-message">{error}</p>}{' '}
      {/* Display error if any */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form__header">
          <span className="form__icon-status">
            <Fingerprint />
          </span>
          <span>Login</span>
        </div>
        <label>
          <span>Username:</span>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            required
          />
        </label>

        <label htmlFor="password">
          <span>Password:</span>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
        </label>

        <button type="submit" className="btn-primary">
          Login
        </button>
        <div className="form__footer">
          <div className="register-link form__msg">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
