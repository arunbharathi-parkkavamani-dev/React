import express from 'express';
import { getSidebar } from '../controllers/sidebarController.js';

const router = express.Router();

// GET /api/sidebar
router.get('/', getSidebar);

export default router;
