const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "bc2020",
  database: "employeeDB"
});

connection.query = util.promisify(connection.query);

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
            choices: ["Add Employee","Add Role","Add Department", "View Departments","View Roles","View Employees", "Update Employee Roles","EXIT"]
      }).then(function(answer) {
        switch (answer.initiate){
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Update Employee Roles":
                updateRoles();
                break;
            case "EXIT":
                connection.end();            
      }});
}

async function addEmployee() {
    let roles = await connection.query("SELECT id, title FROM Employee_role");
    let employees = await connection.query("SELECT * FROM Employee")
    let roleChoices = roles.map(function(role) {
        return{
        name:role.title,
        value:role.id
        }
    })
    let managerChoices = employees.map(function(employee){
        return{
            name:employee.first_name+" "+employee.last_name,
            value:employee.id
        }
    })
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employees first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employees last name?"
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the employees role?",
                choices: roleChoices
            },  
            {
                name: "manager_id",
                type: "list",
                message: "Who is the manager?",
                choices: managerChoices
            }
        ]).then((answers)=>{
            connection.query("INSERT INTO Employee SET ?", answers);
            console.log(answers)
        })

}

async function addRole(){
    let departments = await connection.query("SELECT id, department_name FROM Department");
    let titles = await connection.query("SELECT id, title FROM Employee_role");
    let departmentChoices = departments.map(function(department) {
        return{
        name:department.department_name,
        value:department.id
        }
    })
    let titleChoices = titles.map(function(title) {
        return{
        name:title.title,
        value:title.id
        }
    })

    inquirer
        .prompt([
            {
                name: "title",
                type: "list",
                message: "What is the position title?",
                choices: titleChoices
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "department_id",
                type: "list",
                message: "What is the department id?",
                choices: departmentChoices
            }]).then((answers)=>{
                connection.query("INSERT INTO Employee_role SET ?", answers)
            })
}
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to add?"
            }
            ]).then((answers)=>{
                connection.query("INSERT INTO Department SET ?", answers)
            })
}
async function viewDepartments(){
let deptView = await connection.query("SELECT * FROM Department");
let showDept = await deptView.map(function(depList){
    return{
        name:depList.department_name,
        value:depList.id
    }
})
console.log(showDept);
}
async function viewRoles() {
let roleView = await connection.query("SELECT * FROM Employee_role");
let showRoles = await roleView.map(function(roleList){
    return{
        name:roleList.title,
        value:roleList.id
    }
})
console.log(showRoles);
}
async function viewEmployees(){
}
function updateRoles() {
}
