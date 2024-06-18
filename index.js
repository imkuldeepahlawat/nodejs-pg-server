const express = require("express");
const app = express();
const pool = require('./seed')

const bodyParser = require("body-parser");
const router = require("./routes/index");
require("dotenv").config();
const morgan = require("morgan");


app.use(morgan("dev"));

// Parse JSON request bodies
app.use(bodyParser.json());

// Create a PostgreSQL connection pool

// Test the database connection
pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
});

// Define your routes and CRUD operations here
// Start your Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });
app.use("/",router)


exports.app = app;
