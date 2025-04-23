import express from 'express';
import { CreateUserList, DeleteUserList, GetAllUsersList, getCurrentUser, GetUsersById, Login, Logout, UpdateUserList } from '../controllers/userListsController.js';

const router = express.Router();


router.post('/login', Login);                   // POST login
router.post('/logout', Logout);                 // POST logout
router.get('/:me', getCurrentUser);              // GET current logged in user
router.get('/', GetAllUsersList);                // GET all users
router.get('/:id', GetUsersById);               // GET user by ID
router.post('/', CreateUserList);               // POST create user
router.put('/:id', UpdateUserList);             // PUT update user
router.delete('/:id', DeleteUserList);          // DELETE user



export default router;

