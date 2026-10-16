import express from 'express';
// Destructure the named export from your controller file
import { createEmployee, deleteEmployee } from '../controller/employee.controller.js';
import { getEmployeeById } from '../controller/employee.controller.js';
import { getAllEmployees } from '../controller/employee.controller.js';
import { updateEmployee } from '../controller/employee.controller.js';
const route = express.Router();

// Test Route
route.get("", (req, res) => {
  res.send("<h1 style='color:red'>Hello World</h1>");
});

// Employee Creation Route
route.post("/add", createEmployee);
route.get("/all",  getAllEmployees );
route.get("/:id", getEmployeeById);
route.put("/update/:id", updateEmployee);
route.delete("/delete/:id", deleteEmployee);
export default route;