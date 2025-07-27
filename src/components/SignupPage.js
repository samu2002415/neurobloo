import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();
  const [user_type, setUser_type] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_type,username, email, password})
      });

      const data = await response.json();
      if (data.success) {
        alert('Signup successful!');
        navigate('/login');
        // Redirect to login or home page
        // navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1 className="logo-title">Neuro<span>Bloom</span></h1>

      <div className="role-selector">
        <div className={`role ${user_type === 'Student' ? 'active' : ''}`} onClick={() => setUser_type('Student')}>
          <img src="/assets/boy.png" alt="Student" />
          <p>Student</p>
        </div>
        <div className={`role ${user_type === 'Parent' ? 'active' : ''}`} onClick={() => setUser_type('Parent')}>
          <img src="/assets/mom.webp" alt="Parent" />
          <p>Parent</p>
        </div>
        <div className={`role ${user_type === 'Teacher' ? 'active' : ''}`} onClick={() => setUser_type('Teacher')}>
          <img src="/assets/teacher.png" alt="Teacher" />
          <p>Teacher</p>
        </div>
      </div>

      <form className="form-image-container" onSubmit={handleSignup}>
        <div className="signup-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="sign-button">Sign Up</button>
        </div>

        <div className="image-section">
          <img src="/assets/child1.jpeg" alt="Child Playing" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
