// src/components/MathAdventurePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './MathAdventurePage.css';

function MathAdventurePage() {
  const location = useLocation();
  const username = location.state?.username || 'UserName';

  return (
    <div className="math-page-container">
      <header className="math-header">
        <nav className="math-nav">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
           <a href="/progress-tracker">Progress Tracker</a>
          <a href="/Setting">Setting</a>
        </nav>
        {/*<div className="user-info">
          <span>
            <strong>Hello,</strong>
            <span className="username"> {username}</span>
          </span>
          
        </div>*/}
      </header>

      <h2 className="math-title">Math Adventure !</h2>
      <p className="instruction-text"><b>Solve the problem: 3 + 2 = ?</b></p>

      <div className="math-levels">
        <div className="level-card">
          <img src="/assets/math1.png" alt="Previous" />
          <p>Level 1</p>
        </div>
        <div className="math-3d-card">
  <span>(2 + 1 = ?)</span>
</div>
        <div className="level-card">
          <img src="/assets/math1.png" alt="Next" />
          <p>Level 2</p>
        </div>
      </div>

      <button className="math-btn">Today Learning</button>
    </div>
  );
}

export default MathAdventurePage;
