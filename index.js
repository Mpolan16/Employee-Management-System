const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const consoletable = require("console.table");

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

async function start() {
    const answer = await inquirer
        .prompt({
            name: "initiate",
            type: "list",
            message: "Would you like to do?",
            choices: ["Add Employee", "Add Role", "Add Department", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "EXIT"]
        });
    nextQuestion(answer.initiate);
    };
    async function nextQuestion(answer){
    switch (answer) {
        case "Add Employee":
            await addEmployee();
            start();
            break;
        case "Add Role":
            await addRole();
            start();
            break;
        case "Add Department":
            await addDepartment();
            start();
            break;
        case "View Departments":
            await viewDepartments();
            start();
            break;
        case "View Roles":
            await viewRoles();
            start();
            break;
        case "View Employees":
            await viewEmployees();
            start();
            break;
        case "Update Employee Roles":
            await updateRoles();
            start();
            break;
        case "EXIT":
            connection.end();
    }
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
    await inquirer
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
            console.table(answers)
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
    await inquirer
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
                connection.query("INSERT INTO Employee_role SET ?", answers);
                console.table(answers);
            })
            
}
async function addDepartment() {
    await inquirer
        .prompt([
            {
                name: "department_name",
                type: "input",
                message: "What department would you like to add?"
            }
            ]).then((answers)=>{
                connection.query("INSERT INTO Department SET ?", answers);
                console.table(answers);
            });

}
async function viewDepartments(){
let showDepartment= await connection.query("SELECT * FROM Department");
console.table(showDepartment);
}
async function viewRoles() {
let showRoles = await connection.query("SELECT * FROM Employee_role");
console.table(showRoles);
}
async function viewEmployees(){
let showEmployees = await connection.query("SELECT * FROM Employee");
console.table(showEmployees);
}
async function updateRoles() {
    let roles = await connection.query("SELECT id, title FROM Employee_role");
    let employees = await connection.query("SELECT id, first_name, last_name FROM Employee")
    let roleChoices = roles.map(function(role) {
        return{
        name:role.title,
        value:role.id
        }
    })
    let employeeChoices = employees.map(function(employee){
        return{
            name:employee.first_name + " " + employee.last_name,
            value:employee.id
        }
    })

    await inquirer
        .prompt([
            {
                name: "employeeChoices",
                type: "list",
                message: "What is the name of the employee to update?",
                choices:employeeChoices
            },
            {
                name: "roleChoices",
                type: "list",
                message: "What role will you update it to?",
                choices: roleChoices
            }
            ]).then((update)=>{
                connection.query("UPDATE Employee SET role_id = ? WHERE id = ?", [update.roleChoices,update.employeeChoices]);
                console.log("Update complete!");
            });
}
