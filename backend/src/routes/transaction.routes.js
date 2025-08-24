import express from 'express';
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transaction.controller.js';
import { protect } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.post('/', protect, addTransaction);
router.get('/', protect, getTransactions);
router.delete('/:id', protect, deleteTransaction);
router.put('/:id', protect, updateTransaction);


export default router;