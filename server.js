// Start of JS file
// Hosts the data for the terminal.
// Require express, mySQL, and inquirer in order for application to function.
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
// PORT and express object.
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found).
app.use((req, res) => {
    res.status(404).end();
  });

// Connect to database.
const db = mysql.createConnection(
    {
        // Host, username, password from my own info
      host: 'd6rii63wp64rsfb5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user: 'tgd0mxln1cijce41',
      password: 'f78a0ymezkt8pv55',
      database: 'aor7nu9wipo6wsf3'
    },
    console.log(`Connected to the employees_db database.`)
  );

// App listening on port 3001.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// Inquirer prompts for user input.
function run(){
    inquirer
    .prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'selection',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit'
            ],
        }
    ).then((answer) =>
    {
        switch (answer.selection) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case'Update Employee Role':
                updateEmpRole();
                break;
            default:
                db.end();
                break;
    }
});
}

// GET all departments.
function viewDepartments()
{
    //app.get('/api/department', (req, res) => 
    //{
        //const sql = `SELECT id, dept_name AS Depts FROM department`;
        const sql = `SELECT * FROM DEPARTMENT`;
        
        db.query(sql, (err, rows) => {
            // if (err) {
            //     res.status(500).json({ error: err.message });
            //     return;
            // }
            // res.json({
            //     message: 'success',
            //     data: rows
            // });
            if (err) throw err;
            console.table(rows);
            run();
        });
    //});
}

// GET all roles.
function viewRoles()
{
    //app.get('/api/role', (req, res) => 
    //{
        //const sql = `SELECT id, title AS Roles FROM role`;
        const sql = `SELECT * FROM ROLE`;
        
        db.query(sql, (err, rows) => {
            // if (err) {
            //     res.status(500).json({ error: err.message });
            //     return;
            // }
            // res.json({
            //     message: 'success',
            //     data: rows
            // });
            if (err) throw err;
            console.table(rows);
            run();
        });
    //});
}

// GET all employees.
function viewEmployees()
{
    //app.get('/api/employee', (req, res) => 
    //{
        //const sql = `SELECT id, first_name, last_name AS Employees FROM employee`;
        const sql = `SELECT * FROM EMPLOYEE`;
        
        db.query(sql, (err, rows) => {
            // if (err) {
            //     res.status(500).json({ error: err.message });
            //     return;
            // }
            // res.json({
            //     message: 'success',
            //     data: rows
            // });
            if (err) throw err;
            console.table(rows);
            run();
        });
    //});
}

// POST new department.
function addDept()
{
    //app.post('/api/new-department', ({ body }, res) => 
    //{
        inquirer
        .prompt(
            {
                name: 'dept_name',
                type: 'input',
                message: 'Enter the department name you want to add: '
            }
        ).then((answer) => {

        const sql = `INSERT INTO department (dept_name) VALUES (?)`;
        const params = [answer.dept_name];
        
        db.query(sql, params, (err, result) => {
            // if (err) {
            //     res.status(400).json({ error: err.message });
            //     return;
            // }
            // res.json({
            //     message: 'success',
            //     data: body
            // });
            if (err) throw err;
            console.table(result);
            run();
        });
    });
    //});
}

// POST new role.
function addRole()
{
    //app.post('/api/new-role', ({ body }, res) => 
    //{
        inquirer
        .prompt(
            {
                name: 'role_name',
                type: 'input',
                message: 'Enter the role name you want to add: '
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary of the role you want to add (no commas): '
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter the department ID you want to add: '
            }
        ).then((answer) => {
        const sql = `INSERT INTO role (role_name, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answer.role_name, answer.salary, answer.departnent_id];
        
        db.query(sql, params, (err, result) => {
            // if (err) {
            //     res.status(400).json({ error: err.message });
            //     return;
            // }
            // res.json({
            //     message: 'success',
            //     data: body
            // });
            if (err) throw err;
            console.table(result);
            run();
        });
    });
    //});
}

// POST new employee.
function addEmployee()
{
    //app.post('/api/new-employee', ({ body }, res) => 
    //{
        inquirer
        .prompt(
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the employee you want to add: '
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the employee you want to add: '
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'Select the role ID:',
                choices: role
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Select the manager ID:',
                choices: employee
            }
        ).then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name) VALUES (?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
        
        db.query(sql, params, (err, result) => {
            // if (err) {
            //     res.status(400).json({ error: err.message });
            //     return;
            // }
            // res.json({
            //     message: 'success',
            //     data: body
            // });
            if (err) throw err;
            console.table(result);
            run();
        });
    });
    //});
}

// PUT (update employee's role).
function updateEmpRole()
{
    //app.put('/api/employee/:role_id', (req, res) => 
    //{
        inquirer
        .prompt(
            {
                name: 'employee',
                type: 'list',
                message: 'Select the employee whose role you want to update: ',
                choices: employee
            },
            {
                name: 'new_role',
                type: 'list',
                message: 'Select the new role for the employee: ',
                choices: role
            }
        ).then((answer) => {
        const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
        const params = [answer.role_id, answer.first_name, answer.last_name];
        
        db.query(sql, params, (err, result) => {
            // if (err) {
            //     res.status(400).json({ error: err.message });
            // } 
            // else if (!result.affectedRows) 
            // {
            //     res.json({
            //         message: 'Role not found'
            //     });
            // } 
            // else 
            // {
            //     res.json({
            //         message: 'success',
            //         data: req.body,
            //         changes: result.affectedRows
            //     });
            // }
            if (err) throw err;
            console.table(result);
            run();
        });
        });
    //});
}
  
// BONUS:
// PUT (update employee's manager(s))
// GET employee by manager
// GET employee by department
// DELETE departments, roles, employees.
// GET total budget of department (aka combined salaries of all employees in department) 

// Start inquirer prompt(s).
run();
// End of JS file