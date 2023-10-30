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
app.get('/api/department', (req, res) => 
{
    const sql = `SELECT id, dept_name AS Depts FROM department`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// GET all roles.
app.get('/api/role', (req, res) => 
{
    const sql = `SELECT id, title AS Roles FROM role`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// GET all employees.
app.get('/api/employee', (req, res) => 
{
    const sql = `SELECT id, first_name, last_name AS Employees FROM employee`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
});

// POST new department.
app.post('/api/new-department', ({ body }, res) => 
{
    const sql = `INSERT INTO department (dept_name)
    VALUES (?)`;
  const params = [body.dept_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// POST new role.
app.post('/api/new-role', ({ body }, res) => 
{
    const sql = `INSERT INTO role (role_name)
    VALUES (?)`;
  const params = [body.role_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// POST new employee.
app.post('/api/new-employee', ({ body }, res) => 
{
    const sql = `INSERT INTO employee (first_name, last_name)
    VALUES (?)`;
  const params = [body.first_name, body.last_name];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// PUT (update employee's role).
app.put('/api/employee/:role_id', (req, res) => {
    const sql = `UPDATE employee SET first_name = ?, last_name = ? WHERE role_id = ?`;
    const params = [req.body.first_name, req.body.last_name, req.params.role_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });
  
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