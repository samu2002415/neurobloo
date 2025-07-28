const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const handleLogin = require('./routes/handleLogin');
const settingsRoute = require('./routes/Setting');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
// MySQL DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 's',           // ✅ Replace with your actual password
  database: 'neurobloom'
});

db.connect(err => {
  if (err) {
    console.log('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL DB');
  }
});

// ================== API Routes ==================

// User Login Route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Login DB error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// User Signup Route
app.post('/api/signup', (req, res) => {
  const { user_type, username, email, password } = req.body;
  const query = 'INSERT INTO users (user_type, username, email, password) VALUES (?, ?, ?, ?)';

  db.query(query, [user_type, username, email, password], (err, result) => {
    if (err) {
      console.error('Signup error:', err);
      return res.status(500).json({ success: false, message: 'Signup failed. Please try again.' });
    }
    res.json({ success: true, message: 'User registered successfully!' });
  });
});

// Progress Tracker: Fetch user progress
app.get('/api/progress/:username', (req, res) => {
  const { username } = req.params;

  const query = `
    SELECT day, score, activities_completed
    FROM user_progress
    WHERE username = ?
    ORDER BY day ASC
  `;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Progress fetch error:', err);
      return res.status(500).json({ success: false, message: 'Failed to fetch progress data.' });
    }
    res.json({ success: true, data: results });
  });
});

// Progress Tracker: Insert user progress (optional)
app.post('/api/progress', (req, res) => {
  const { username, day, score, activities_completed } = req.body;

  const query = `
    INSERT INTO user_progress (username, day, score, activities_completed)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [username, day, score, activities_completed], (err, result) => {
    if (err) {
      console.error('Progress insert error:', err);
      return res.status(500).json({ success: false, message: 'Failed to insert progress data.' });
    }
    res.json({ success: true, message: 'Progress data added successfully.' });
  });
});

///api/progress/download/:username
app.get('/api/progress/download-pdf/:username', (req, res) => {
  const { username } = req.params;

  const query = `
    SELECT day, score, activities_completed
    FROM user_progress
    WHERE username = ?
    ORDER BY day ASC
  `;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error(' PDF download error:', err);
      return res.status(500).json({ success: false, message: 'Download failed.' });
    }

    const doc = new PDFDocument();
    const date = new Date().toLocaleDateString();

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename=${username}_progress_report.pdf`);
    res.setHeader('Content-Type', 'application/pdf');

    // Pipe the PDF into the response
    doc.pipe(res);

    // PDF Content
    doc.fontSize(20).text('NeuroBloom - Progress Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Username: ${username}`);
    doc.text(`Report Date: ${date}`);
    doc.moveDown();

    // Table headers
    doc.fontSize(14).text('Day', 100, doc.y, { continued: true });
    doc.text('Score', 200, doc.y, { continued: true });
    doc.text('Activities Completed', 300, doc.y);

    doc.moveDown(0.5);
    doc.fontSize(12);

    results.forEach(row => {
      doc.text(`${row.day}`, 100, doc.y, { continued: true });
      doc.text(`${row.score}`, 200, doc.y, { continued: true });
      doc.text(`${row.activities_completed}`, 300, doc.y);
    });

    doc.end(); // Finalize PDF
  });
});
// Settings API
app.use('/api/setting', settingsRoute);

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
