import express from 'express';
import { getFinancialAssessment } from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/financial-assessment', protect, getFinancialAssessment);

export default router;