import ErrorHandler from "../utils/ErrorHandler.js";
import ErrorWrapper from "../utils/ErrorWrapper.js";
import Transaction from "../models/transaction.model.js";

export const addTransaction = ErrorWrapper(async(req, res, next)=>{
    const { type, date, amount, category, description}= req.body;

    if(!type || !amount || !category || !description  || !date){
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const  transaction = await  Transaction.create({
        type, 
        category, 
        date, 
        amount, 
        description,
        userId: req.user.id
    });

    res.status(201).json({
        success:true,
        message:"Transaction created successfully",
        data:transaction
    })
})



export const getTransactions= ErrorWrapper(async(req, res, next)=>{
    const transactions = await Transaction.find({userId: req.user.id}).sort({date: -1});
    res.status(200).json({
        success: true,
        data: transactions
    })
}) 


export const deleteTransaction = ErrorWrapper(async (req, res, next)=>{
  
    
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
    throw new ErrorHandler(404, 'Transaction not found.');
  }

  if (transaction.userId.toString() !== req.user.id) {
    throw new ErrorHandler(401, 'Not authorized to delete this transaction.');
  }

    await transaction.deleteOne();
res.status(200).json({
    success: true,
    message: 'Transaction deleted successfully.'
})
})


export const updateTransaction = ErrorWrapper(async (req, res) => {
  let transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    throw new ErrorHandler(404, 'Transaction not found.');
  }

  if (transaction.userId.toString() !== req.user.id) {
    throw new ErrorHandler(401, 'Not authorized to update this transaction.');
  }

  transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // This option returns the modified document                 dono andu pandu cheeze h bas main kam PUT request hi kar rha h
    runValidators: true, // This runs schema validators on the update
  });

  res.status(200).json({
    success: true,
    message: 'Transaction updated successfully.',
    data: transaction,
  });
});