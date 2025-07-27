import React from 'react';
import './ProfilePage.css';
import { useLocation } from 'react-router-dom';

function ProfilePage() {
const location = useLocation();
const username = location.state?.username || 'Guest';
  const email = 'john@example.com';
  const role = 'Student';

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="top-bar">
          <div className="greeting-box">
            <span className="greeting">Hello, <strong className="username">{username}</strong></span>
          {/* <img src="/assets/user-avatar.png" alt="User" className="avatar" />*/}
          </div>
        </div>
        <nav className="nav-links">
           <a href="/home">Home</a>
          <a href="/profile">Profile</a>
           <a href="/progress-tracker">Progress Tracker</a>
          <a href="/Setting">Setting</a>
        </nav>
      </header>

      <main className="profile-main">
        <div className="profile-card">
          {/*<img src="/assets/user-avatar.png" alt="Avatar" className="profile-avatar" />*/}
          <h2>{username}</h2>
          <p>Email: {email}</p>
          <p>Role: {role}</p>
          <button className="edit-btn">Edit Profile</button>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
