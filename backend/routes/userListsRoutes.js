import express from 'express';
import { CreateUserList, DeleteUserList, GetAllUsersList, GetUsersById, UpdateUserList } from '../controllers/userListsController.js';

const router = express.Router();


router.get('/', GetAllUsersList);                // GET all users
router.get('/:id', GetUsersById);               // GET user by ID
router.post('/', CreateUserList);               // POST create user
router.put('/:id', UpdateUserList);             // PUT update user
router.delete('/:id', DeleteUserList);          // DELETE user



export default router;

