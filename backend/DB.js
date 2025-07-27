
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 's', 
  database: 'neurobloom'
});

db.connect((err) => {
  if (err) {
    console.error(' DB Connection Failed:', err);
  } else {
    console.log(' Connected to MySQL Database');
  }
});

module.exports = db;
