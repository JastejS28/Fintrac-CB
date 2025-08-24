// backend/src/routes/report.routes.js

import express from 'express';
import { exportTransactions, getCategoryBreakdown, getMonthlySummary } from '../controllers/report.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/monthly-summary', protect, getMonthlySummary);
router.get('/category-breakdown', protect, getCategoryBreakdown);
router.post('/export', protect, exportTransactions);


export default router;