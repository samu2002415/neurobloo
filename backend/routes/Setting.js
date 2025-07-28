const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 's',
  database: 'neurobloom'
});

// GET settings by username
router.get('/:username', (req, res) => {
  const { username } = req.params;

  const query = 'SELECT email, notifications, theme FROM settings WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Fetch error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length > 0) {
      res.json({ success: true, settings: results[0] });
    } else {
      // If no settings found, insert default
      const insertQuery = 'INSERT INTO settings (username) VALUES (?)';
      db.query(insertQuery, [username], (insertErr) => {
        if (insertErr) {
          return res.status(500).json({ success: false, message: 'Initialization failed' });
        }
        res.json({ success: true, settings: { email: '', notifications: true, theme: 'light' } });
      });
    }
  });
});

// PUT update settings
router.put('/:username', (req, res) => {
  const { username } = req.params;
  const { email, notifications, theme } = req.body;
  console.log('PUT received:', username, email, notifications, theme); // ✅ Debug line
  
  const query = `
    UPDATE settings
    SET email = ?, notifications = ?, theme = ?
    WHERE username = ?
  `;

  db.query(query, [email, notifications, theme, username], (err, result) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ success: false, message: 'Update failed' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Settings updated successfully' });
  });
});


module.exports = router;
