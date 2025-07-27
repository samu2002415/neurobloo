import React, { useEffect, useState } from 'react';
import './SettingPage.css';

function SettingPage({ username }) {
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');
  const [message, setMessage] = useState('');

  // ✅ Fetch current settings
  useEffect(() => {
    fetch(`http://localhost:5000/api/settings/${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setEmail(data.settings.email);
          setNotifications(data.settings.notifications);
          setTheme(data.settings.theme);
        } else {
          setMessage('Failed to load settings');
        }
      })
      .catch(err => {
        console.error(err);
        setMessage('Error loading settings');
      });
  }, [username]);

  // ✅ Update settings
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/settings/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, notifications, theme })
      });

      const result = await response.json();
      if (result.success) {
        setMessage('Settings updated successfully!');
      } else {
        setMessage('Update failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error updating settings');
    }
  };

  return (
    <div className="setting-container">
      <header className="setting-header">
        <div className="user-info">
          
        </div>
        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/profile">Profile</a>
           <a href="/progress-tracker">Progress Tracker</a>
          <a href="/Setting">Setting</a>
        </nav>
       
      </header>

      <h2 className="setting-title">Settings</h2>

      <div className="setting-form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Notifications</label>
        <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />

        <label>Theme</label>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>

        <button onClick={handleUpdate}>Save Settings</button>

        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}

export default SettingPage;
