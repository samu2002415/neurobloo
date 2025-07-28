import React from 'react';
import { useLocation } from 'react-router-dom';
import './WritingAdventurePage.css';
import CatModelViewer from './CatModelViewer';

function WritingLevel1() {
  const location = useLocation();
  const username = location.state?.username || 'User';

  return (
    <div className="reading-container">
      <header className="reading-header">
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/progress-tracker">Progress Tracker</a>
          <a href="/setting">Setting</a>
        </nav>
      </header>

      <main className="reading-main">
        <h2 className="reading-title">Level 1 - Trace the Object: <strong>CAT</strong></h2>
        <CatModelViewer />
        <button className="ar-button">Start Level 1</button>
      </main>
    </div>
  );
}

export default WritingLevel1;
