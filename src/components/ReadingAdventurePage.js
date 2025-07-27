import React from 'react';
import { useLocation } from 'react-router-dom';
import './ReadingAdventurePage.css';

function ReadingAdventurePage() {
  const location = useLocation();
  const username = location.state?.username || 'User';

  return (
    <div className="reading-container">
      <header className="reading-header">
        <div className="user-greeting">
          {/* <span>Hello, <strong className="username">{username}</strong></span>*/}
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

        <div className="letter-3d">A</div>


        <button className="ar-button">Start AR Learning</button>
      </main>
    </div>
  );
}

export default ReadingAdventurePage;
