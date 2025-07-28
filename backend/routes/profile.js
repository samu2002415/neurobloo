const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Avatar upload setup
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.params.username}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Get profile data
router.get('/:username', (req, res) => {
  const { username } = req.params;
  db.query('SELECT username, email, user_type, avatar_url FROM users WHERE username = ?', [username], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: results[0] });
  });
});

// Upload avatar
router.post('/upload-avatar/:username', upload.single('avatar'), (req, res) => {
  const avatarPath = `http://localhost:5000/uploads/${req.file.filename}`;
  db.query('UPDATE users SET avatar_url = ? WHERE username = ?', [avatarPath, req.params.username], (err) => {
    if (err) return res.status(500).json({ message: 'Upload failed' });
    res.json({ success: true, avatar_url: avatarPath, message: 'Avatar updated' });
  });
});

// Update password
router.put('/update-password/:username', (req, res) => {
  const { password } = req.body;
  db.query('UPDATE users SET password = ? WHERE username = ?', [password, req.params.username], (err) => {
    if (err) return res.status(500).json({ message: 'Update failed' });
    res.json({ success: true, message: 'Password updated successfully' });
  });
});

module.exports = router;
