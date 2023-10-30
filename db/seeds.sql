INSERT INTO department (id, dept_name)
VALUES (1, "Development");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Software Dev", 90,000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Melanie", "Smith", 1, 3);