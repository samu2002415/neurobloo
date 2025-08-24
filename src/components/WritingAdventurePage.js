import React from 'react';
import { useLocation } from 'react-router-dom';
import './WritingAdventurePage.css';
import CatModelViewer from './CatModelViewer';
import { useNavigate } from 'react-router-dom';


function WritingAdventurePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'User';

  const goToLevel1 = () => {
    navigate('/writing-level-1', { state: { username } });
  };
  return (
    <div className="reading-container">
      <header className="reading-header">
        <div className="right-header-content">
          <nav className="nav-links">
            <a href="/home">Home</a>
          <a href="/profile">Profile</a>
           <a href="/progress-tracker">Progress Tracker</a>
          <a href="/Setting">Setting</a>
          </nav>
          {/*<div className="user-info">
            Hello, <strong className="username">{username}</strong>!
          </div>*/}
        </div>
      </header>

      <main className="reading-main">
        <h2 className="reading-title">Reading Adventure !</h2>
        <p className="reading-instruction">Trace the Object  <strong>CAT</strong></p>
        <CatModelViewer />
          <div className="level-section">
          <div className="level-card" onClick={goToLevel1} style={{ cursor: 'pointer' }}>
            <img src="/assets/read.png" alt="Level 1" />
            <div className="level-label">Previous Level</div>
          </div>
         

          <div className="level-card">
            <img src="/assets/read.png" alt="Level 2" />
            <div className="level-label">Next Level</div>
          </div>
        </div>

        <button className="ar-button">Start Today Learning</button>
      </main>
    </div>
  );
}

export default WritingAdventurePage;
