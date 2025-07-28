
import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useLocation } from 'react-router-dom';

function ProfilePage() {
  const location = useLocation();
  const defaultUser = {
  username: location.state?.username || 'Guest',
  email: location.state?.email || '',
  user_type: location.state?.user_type || ''
};
  const username = location.state?.username || 'Guest';

  const [userData, setUserData] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch profile details
  useEffect(() => {
    fetch(`http://localhost:5000/api/profile/${username}`)
      .then(res => res.json())
      .then(data => {
        setUserData(data.user);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setLoading(false);
      });
  }, [username]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    // Show preview immediately
    setAvatarPreview(URL.createObjectURL(file));

    try {
      const res = await fetch(`http://localhost:5000/api/profile/upload-avatar/${username}`, {
        method: 'POST',
        body: formData
      });
      const result = await res.json();
      setMessage(result.message);
      if (result.avatar_url) {
        setUserData(prev => ({ ...prev, avatar_url: result.avatar_url }));
      }
    } catch (error) {
      setMessage('Failed to upload avatar.');
    }
  };

  const handlePasswordUpdate = async () => {
    if (password.trim().length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }
    console.log('Updating password for', username, 'to', password);
    try {
      const res = await fetch(`http://localhost:5000/api/profile/update-password/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const result = await res.json();
      setMessage(result.message);
      setPassword('');
    } catch (error) {
      setMessage('Error updating password.');
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="top-bar">
          <div className="greeting-box">
            <span className="greeting">Hello, <strong className="username">{username}</strong></span>
          </div>
        </div>
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
          <a href="/progress-tracker">Progress Tracker</a>
          <a href="/setting">Setting</a>
        </nav>
      </header>

      <main className="profile-main">
        <div className="profile-card">
          <img
            src={avatarPreview || userData?.avatar_url || '/default-avatar.png'}
            alt="Avatar"
            className="profile-avatar"
          />

          <h2>{userData?.username}</h2>
          <p>Email: {userData?.email}</p>
          <p>Role: {userData?.user_type}</p>

          <div className="form-section">
            <label>Change Avatar:</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
          </div>

          <div className="form-section password-section">
            <label>Change Password:</label>
            <input
              type="password"
              value={password}
              placeholder="New password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handlePasswordUpdate}>Update Password</button>
          </div>

          {message && <p className="status-message">{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
