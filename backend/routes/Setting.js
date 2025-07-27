const express = require('express');
const router = express.Router();
const db = require('../db'); // You can also just use `db` from index.js if you prefer

//  GET user settings
router.get('/:username', (req, res) => {
  const username = req.params.username;
  const query = 'SELECT email, notifications, theme FROM neurobloom.users WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, settings: results[0] });
  });
});

// (Update) user settings
router.put('/:username', (req, res) => {
  const username = req.params.username;
  const { email, notifications, theme } = req.body;

  const query = 'UPDATE neurobloom.users SET email = ?, notifications = ?, theme = ? WHERE username = ?';

  db.query(query, [email, notifications, theme, username], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Update failed' });
    }

    res.json({ success: true, message: 'Settings updated successfully' });
  });
});

module.exports = router;
