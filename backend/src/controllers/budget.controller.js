import Budget from '../models/budget.model.js';
import ErrorWrapper from '../utils/errorWrapper.js';
import ErrorHandler from '../utils/ErrorHandler.js';
export const setBudget = ErrorWrapper(async (req, res) => {
  const { category, limit } = req.body;
  const userId = req.user.id;

  if (!category || limit === undefined || limit === '') {
    throw new ErrorHandler(400, "Please provide a category and a valid limit.");
  }

  const numericLimit = parseFloat(limit);

  if (isNaN(numericLimit)) {
    throw new ErrorHandler(400, "Limit must be a valid number.");
  }

  const budget = await Budget.findOneAndUpdate(
    { userId, category },
    { limit: numericLimit }, // Use the converted number
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Budget set/updated successfully",
    data: budget
  });
});

export const getBudgets = ErrorWrapper(async(req,res,next)=>{
    const budgets= await Budget.find({userId: req.user.id});

    res.status(200).json({
        success: true,
        data: budgets
    });
})