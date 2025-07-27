import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginPage.css';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home', { state: { username } });
    
    console.log('Username:', username);
    console.log('Password:', password);

    
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-left">
          <h2>
            Welcome Back <br />
            <span className="brand-name">NeuroBloom</span>
          </h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <p className="signup-text">
              Do you have an account? <a href="/signup">Sign</a>
            </p>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
        <div className="login-right">
          <img src="/assets/child.jpeg" alt="Kid 1" />
          <img src="/assets/child.jpeg" alt="Kid 2" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
