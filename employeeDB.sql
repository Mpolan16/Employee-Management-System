DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE Department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE Employee_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM Department;
select * from Employee_role;
select * from Employee;

INSERT INTO Department (department_name)
VALUES ("sales"),("engineering"),("HR");

INSERT INTO Employee_role (title, salary, department_id)
VALUES ("sales manager", 80000,1),("lead engineer", 170000,2),("sales associate", 45000,1),("technician", 85000,2);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Cruz", 2,null),("carmelo", "Smith",4,1),("Henry","Lopez",1,null),("Mabel","Diaz",3,3);

