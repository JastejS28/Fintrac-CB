import Transaction from '../models/transaction.model.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import Papa from 'papaparse'

export const getMonthlySummary = ErrorWrapper(async (req, res) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 1);

  const summary = await Transaction.aggregate([
    {
      $match: {
        userId: req.user._id, // Match transactions for the logged-in user
        date: { $gte: startDate, $lt: endDate } // Match dates within the current month
      }
    },
    {
      $group: {
        _id: '$type', // Group by the 'type' field
        totalAmount: { $sum: '$amount' } // Sum the 'amount' for each group
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  summary.forEach(item => {
    if (item._id === 'income') {
      income = item.totalAmount;
    } else if (item._id === 'expense') {
      expense = item.totalAmount;
    }
  });

  const savings = income - expense;

  res.status(200).json({
    success: true,
    data: {
      income,
      expense,
      savings
    }
  });
});


export const getCategoryBreakdown=  ErrorWrapper(async (req, res, next)=>{
    const now = new Date();

const startDate= req.query.startDate? new Date(req.query.startDate) : new Date(now.getFullYear(), now.getMonth(), 1);    // by default it will give categorisation of the current month and if I want to access of some other month then write this way- http://localhost:4000/api/v1/reports/monthly-summary?startDate=2025-09-01&endDate=2025-10-01
const endDate= req.query.endDate? new Date(req.query.endDate) : new Date(now.getFullYear(), now.getMonth() + 1, 1);

const breakdown = await Transaction.aggregate([
    { $match:{
        userId: req.user._id,
        type: 'expense',
        date:{
            $gte: startDate,
            $lt: endDate
        }
    }},
    { $group: {
        _id: '$category',
        totalAmount : {$sum: '$amount'}
    }},
    {$sort:{
        totalAmount: -1   
    }}
])


res.status(200).json({
    success: true,
    data: breakdown
})
})


export const exportTransactions = ErrorWrapper(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: 'asc' });

  const formattedData = transactions.map(tx => ({
    Date: tx.date.toISOString().split('T')[0], 
    Type: tx.type,
    Category: tx.category,
    Amount: tx.amount,
    Description: tx.description || '', 
  }));

  const csv = Papa.unparse(formattedData);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');

  res.status(200).send(csv);
});