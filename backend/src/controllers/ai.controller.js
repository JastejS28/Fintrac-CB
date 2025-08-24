import ollama from 'ollama';
import ErrorWrapper from '../utils/ErrorWrapper.js';
import Transaction from '../models/transaction.model.js';
import Goal from '../models/goal.model.js';

export const getFinancialAssessment = ErrorWrapper(async( req, res, next)=>{
    const now = new Date();
    const startDate= new Date(now.getFullYear(), now.getMonth(),1);
    const endDate= new Date(now.getFullYear(), now.getMonth()+1,1);

    const summary = await Transaction.aggregate([
    { $match: { userId: req.user._id, date: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: '$type', totalAmount: { $sum: '$amount' } } }
  ]);
  
  // Get spending breakdown by category
  const spendingBreakdown = await Transaction.aggregate([
    { $match: { userId: req.user._id, type: 'expense', date: { $gte: startDate, $lt: endDate } } },
    { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } },
    { $sort: { totalAmount: -1 } }
  ]);

    const goals = await Goal.find({userId: req.user.id})
     let income=0;
     let expense=0;
     summary.forEach(item=>{
        if(item._id=='income') income= item.totalAmount;
        else if( item._id=='expense') expense= item.totalAmount;
     })

const prompt = `
  You are a friendly and encouraging financial assistant named 'Fin'.
  Analyze the following financial data for a user for the current month. All currency values are in Indian Rupees (₹). Please use the Rupee symbol '₹' in your response.
  Provide a short, personalized assessment and 2-3 actionable tips. Speak directly to the user in a conversational tone. Use markdown for formatting.

  User's Financial Summary:
  - Total Income: ₹${income}
  - Total Expenses: ₹${expense}
  - Spending by Category: ${JSON.stringify(spendingBreakdown)}
  - Active Savings Goals: ${JSON.stringify(goals)}

  Based on this data, please provide your assessment and tips. For example, if spending on 'Food' is high, suggest a specific action like meal prepping.
`;
    

  const response = await ollama.chat({
    model: 'llama3', // Or any other model you have, like 'phi3'
    messages: [{ role: 'user', content: prompt }],
  });

  res.status(200).json({
     message: 'Success',
     assessment: response.message.content,
   })

})