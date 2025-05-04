import express from 'express';
import { CreateEmployeeList, DeleteEmployeeList, GetAllEmployeesList, getCurrentEmployee, GetEmployeesById, Login, Logout, UpdateEmployeeList } from '../controllers/EmployeeListController.js';


const router = express.Router();


router.post('/login', Login);                   // POST login
router.post('/logout', Logout);                 // POST logout
router.get('/:me', getCurrentEmployee);         // GET current logged in Employee
router.get('/', GetAllEmployeesList);           // GET all Employees
router.get('/:id', GetEmployeesById);           // GET Employee by ID
router.post('/', CreateEmployeeList);           // POST create Employee
router.put('/:id', UpdateEmployeeList);         // PUT update Employee
router.delete('/:id', DeleteEmployeeList);      // DELETE Employee




export default router;

