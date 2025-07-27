import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LearningHomePage.css';

function LearningHomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || 'Guest';

  const handleReadingClick = () => {
    navigate('/reading');
  };
  const handleMathClick = () => {
   navigate('/Math');};
   
  const handleWritingClick = () => {
    navigate('/Writing');
  };
  return (
    <div className="learning-container">
      <header className="learning-header">
        <div className="user-greeting">
           <span>Hello, <strong className="username">{username}</strong></span>
        </div>
        <nav className="learning-nav">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
           <a href="/progress-tracker">Progress Tracker</a>
          <a href="/Setting">Setting</a>
        </nav>
        {/*<img src="/assets/user-avatar.png" alt="User" className="avatar" />*/}
      </header>

      <h2 className="question-text">Ready To Learn Today ?</h2>

      <div className="module-section">
        <div className="module-card">
          <img src="/assets/pngwing.com.png" alt="Reading" />
          <button className="module-btn"  onClick={handleWritingClick}>Reading</button>
        </div>
        <div className="module-card">
          <img src="/assets/math.png" alt="Math" />
          <button className="module-btn" onClick={handleMathClick}>Math</button>
        </div>
        <div className="module-card">
          <img src="/assets/writing.png" alt="Writing" />
          <button className="module-btn" onClick={handleReadingClick}>Writing</button>
        </div>
      </div>
    </div>
  );
}

export default LearningHomePage;
