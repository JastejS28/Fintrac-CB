import express from 'express';
import { getBudgets, setBudget } from '../controllers/budget.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/',protect, setBudget);
router.get('/',protect, getBudgets);

export default router; 