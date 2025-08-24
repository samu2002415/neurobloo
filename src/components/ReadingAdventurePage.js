import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReadingAdventurePage.css';


function ReadingAdventurePage() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const username = location.state?.username || 'User';

  const handleStart = () => {
  
    navigate('/reading-page1', { state: { username } });
  };

  return (
    <div className="reading-container">
      <header className="reading-header">
        <div className="user-greeting">
          {/* <span>Hello, <strong className="username">{username}</strong></span> */}
        </div>
        <div className="right-header-content">
          <nav className="nav-links">
            <a href="/home">Home</a>
            <a href="/profile">Profile</a>
            <a href="/progress-tracker">Progress Tracker</a>
            <a href="/Setting">Setting</a>
          </nav>
        </div>
      </header>

      <main className="reading-main">
        <h2 className="reading-title">Writing Adventure !</h2>
        <p className="reading-instruction">Trace the letter <strong>A</strong></p>
        
        <button className="ar-button" onClick={handleStart}>
          Start AR Learning
        </button>
      </main>
    </div>
  );
}

export default ReadingAdventurePage;
