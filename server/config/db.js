require('dotenv').config({path: '../.env'});

const mysql = require('mysql2/promise');




const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
  
//   db.connect(err => {
//     if (err) {
//       console.error('Error connecting to DB:', err.message);
//     } else {
//       console.log('Connected to MySQL');
//     }
//   });
  
  module.exports = db;