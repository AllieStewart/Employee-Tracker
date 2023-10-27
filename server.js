// Start of JS file
// Hosts the data for the terminal.
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        // host, username, password from my own info
      host: '',
      user: '',
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

// GET, POST, PUT, DELETE functions here.

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  

// End of JS file