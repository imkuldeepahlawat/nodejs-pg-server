require('dotenv').config();
const { Pool } = require('pg');
;

const pool = new Pool({
    connectionString: process.env.PG_SECURE_URL,
  });
  
  // Create the users table if it doesn't exist
  pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    )
  `, (err, result) => {
    if (err) {
      console.error('Error creating the users table', err);
    } else {
      console.log('Users table created successfully');
    }
  });
  
  // Seed the table with initial data
  pool.query(`
    INSERT INTO users (username, email)
    VALUES
      ('user1', 'user1@example.com'),
      ('user2', 'user2@example.com')
  `, (err, result) => {
    if (err) {
      console.error('Error seeding the users table', err);
    } else {
      console.log('Data seeded successfully');
    }
  });

  module.exports = pool