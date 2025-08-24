import Transaction from '../models/transaction.model.js';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import Papa from 'papaparse'

export const getMonthlySummary = ErrorWrapper(async (req, res) => {
  // 1. Define the time range for the current month
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 1);

  // 2. Build the Aggregation Pipeline
  const summary = await Transaction.aggregate([
    // Stage 1: Filter documents to match our criteria
    {
      $match: {
        userId: req.user._id, // Match transactions for the logged-in user
        date: { $gte: startDate, $lt: endDate } // Match dates within the current month
      }
    },
    // Stage 2: Group the filtered documents by type ('income' or 'expense')
    {
      $group: {
        _id: '$type', // Group by the 'type' field
        totalAmount: { $sum: '$amount' } // Sum the 'amount' for each group
      }
    }
  ]);

  // 3. Format the response
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
        totalAmount: -1   // -1 means sort in descending order
    }}
])


res.status(200).json({
    success: true,
    data: breakdown
})
})


export const exportTransactions = ErrorWrapper(async (req, res) => {
  // 1. Fetch all transactions for the user, sorted by date
  const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: 'asc' });

  // 2. Format the data for a clean CSV output
  const formattedData = transactions.map(tx => ({
    Date: tx.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
    Type: tx.type,
    Category: tx.category,
    Amount: tx.amount,
    Description: tx.description || '', // Use empty string if no description
  }));

  // 3. Convert the formatted JSON data to a CSV string
  const csv = Papa.unparse(formattedData);

  // 4. Set HTTP headers to trigger a file download in the browser
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');

  // 5. Send the CSV data as the response
  res.status(200).send(csv);
});