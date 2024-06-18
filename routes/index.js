const express = require('express');
const pool = require('../seed');
const router = express.Router();

 router.get("/", (req, res) => {
    res.send("HOME PAGE !!!");
  });
 router.post('/users', (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'Both username and email are required' });
    }

    pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email], (err, result) => {
      if (err) {
        console.error('Error inserting user into the database', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ message: 'User created successfully' });
      }
    });
  });


  router.get('/users', (req, res) => {
    // Use COUNT() to get the total number of users
    pool.query('SELECT COUNT(*) as total_users FROM users; SELECT * FROM users;', (err, result) => {
      if (err) {
        console.error('Error executing SQL query', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        // Extract the count from the first query result
        const totalUsers = result[0].rows[0].total_users;

        // Extract user data from the second query result
        const users = result[1].rows;

        // Create a response object with both the count and user data
        const response = {
          total_users: totalUsers,
          users: users,
        };

        res.json(response);
      }
    });
  });

  router.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ error: 'Both username and email are required' });
    }

    pool.query('UPDATE users SET username = $1, email = $2 WHERE id = $3', [username, email, userId], (err, result) => {
      if (err) {
        console.error('Error updating user in the database', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'User updated successfully' });
      }
    });
  });


  router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    pool.query('DELETE FROM users WHERE id = $1', [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user from the database', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    });
  });
  module.exports = router;