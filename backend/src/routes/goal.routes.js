import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createGoal, deleteGoal, getGoals, updateGoal } from '../controllers/goal.controller.js';


const router = express.Router();

router.post('/addGoal', protect, createGoal)
router.get('/getGoals', protect, getGoals)
router.delete('/deleteGoal/:id', protect, deleteGoal)
router.put('/updateGoal/:id', protect, updateGoal)


export default router;