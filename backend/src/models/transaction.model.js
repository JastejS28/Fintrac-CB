import mongoose from 'mongoose';

const transactionSchema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    type:{
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required:true
    }, 
    date:{
        type: Date,
        required: true
    },description: {
      type: String,
      trim: true,  
    }
  
} , { timestamps: true})

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction;