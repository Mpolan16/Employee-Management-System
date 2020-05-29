const mysql = require("mysql");
const inquirer = require("inquire");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mp01151994!",
  database: "employeeDB"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
    inquirer
        .prompt({
            name: "initiate",
            type: "list",
            message: "Would you like to do?",
            choices: ["Add Employee", "View Departments", "Update Employee Roles","EXIT"]
      }).then(function(answer) {
        if (answer.initiate === "Add Employee"){
            addEmployee();
        }
        else if (answer.initiate === "View Departments"){
            viewDepartments();
        }
        else if (answer.initiate === "Update Employee Roles"){
            updateRoles();
        }
        else{
            connection.end();
        }
      });
}

function addEmployee() {
}
function viewDepartments() {
}
function updateRoles() {
}
