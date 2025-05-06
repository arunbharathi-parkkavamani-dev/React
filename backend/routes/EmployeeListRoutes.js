import express from 'express';
import {
    CreateEmployeeList,
    DeleteEmployeeList,
    GetAllEmployeesList,
    getCurrentEmployee,
    GetEmployeesById,
    Login,
    Logout,
    UpdateEmployeeList
} from '../controllers/EmployeeListController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

// Authentication routes
router.post('/login', Login);
router.post('/logout', Logout);

// Employee routes
router.get('/me', getCurrentEmployee);  // <- fixed
router.get('/', GetAllEmployeesList);
router.get('/:id', GetEmployeesById); // GET /api/employees/:id
router.put('/:id', upload.single('profileImage'), UpdateEmployeeList);
router.post('/', upload.single('profileImage'), CreateEmployeeList); // POST /api/employees/
router.delete('/:id', DeleteEmployeeList);

export default router;
