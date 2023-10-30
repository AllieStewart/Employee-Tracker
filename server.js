// Start of JS file
// Hosts the data for the terminal.
// Require express and mySQL in order for application to function.
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        // Host, username, password from my own info
      host: 'd6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'tgd0mxln1cijce41',
      password: 'f78a0ymezkt8pv55',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

// GET, POST, PUT, DELETE functions here.
// GET all departments.

// GET all roles.

// GET all employees.

// POST new department.

// POST new role.

// POST new employee.

// PUT (update employee's role).

// BONUS:
// PUT (update employee's manager(s))
// GET employee by manager
// GET employee by department
// DELETE departments, roles, employees.
// GET total budget of department (aka combined salaries of all employees in department) 

// Default response for any other request (Not Found).
app.use((req, res) => {
    res.status(404).end();
  });

// App listening on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
// End of JS file