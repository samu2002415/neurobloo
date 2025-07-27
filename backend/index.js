const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const handleLogin=require('./routes/handleLogin');
const settingsRoute = require('./routes/Setting');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/Setting', settingsRoute);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 's',
  database: 'neurobloom'
});

db.connect(err => {
  if (err) {
    console.log('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL DB');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Database error' });
    } else if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.post('/signup', (req, res) => {
  const { user_type,username, email, password} = req.body;

  const query = 'INSERT INTO users (user_type,username, email, password) VALUES (?, ?, ?, ?)';

  db.query(query, [user_type,username, email, password ], (err, result) => {
    if (err) {
      console.error('Signup error:', err);
      res.status(500).json({ success: false, message: 'Signup failed. Please try again.' });
    } else {
      res.json({ success: true, message: 'User registered successfully!' });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
