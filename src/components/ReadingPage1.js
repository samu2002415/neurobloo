import React from "react";
import { useLocation } from "react-router-dom";
import LetterAnimator from "./LetterAnimator";
import TracingCanvas from "./TracingCanvas";
import "./ReadingPage1.css";

function ReadingPage1() {
  const location = useLocation();
  const username = location.state?.username || "User";

  return (
    
    <div className="writing-container">
        <header className="reading-header">
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/progress-tracker">Progress Tracker</a>
          <a href="/setting">Setting</a>
        </nav>
      </header>
      <header className="header">
        <h1>✏️ Writing Practice</h1>
        <p> Let’s learn the letter <strong>A</strong>.</p>
      </header>

      <div className="writing-content">
        <div className="left-panel">
          <LetterAnimator letter="A" />
        </div>
        <div className="right-panel">
          <TracingCanvas letter="A" />
        </div>
      </div>

      <footer className="footer">
        <button className="btn">⬅ Previous</button>
        <p>⭐ Keep Going! ⭐</p>
        <button className="btn">Next ➡</button>
      </footer>
    </div>
  );
}

export default ReadingPage1;
