const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');

  const createDBAndTable = `
    CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;
    USE \`${process.env.DB_NAME}\`;
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(createDBAndTable, (err) => {
    if (err) throw err;
    console.log('Database and users table checked/created successfully');
  });
});

module.exports = connection;
