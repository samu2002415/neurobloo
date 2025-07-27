import React from 'react';
import { useLocation } from 'react-router-dom';
import './WritingAdventurePage.css';
import CatModelViewer from './CatModelViewer';

function WritingAdventurePage() {
  const location = useLocation();
  const username = location.state?.username || 'User';

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
        <p className="reading-instruction">Trace the Object  <strong>DOG</strong></p>
        <CatModelViewer />
        <div className="level-section">
          <div className="level-card">
            <img src="/assets/read.png" alt="Level 1" />
            <div className="level-label">Level 1</div>
          </div>

         

          <div className="level-card">
            <img src="/assets/read.png" alt="Level 2" />
            <div className="level-label">Level 2</div>
          </div>
        </div>

        <button className="ar-button">Start AR Learning</button>
      </main>
    </div>
  );
}

export default WritingAdventurePage;
