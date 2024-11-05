import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    // Call the onLogin prop with the username and password
    onLogin({ username, password });

    // Clear fields after submission
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;

