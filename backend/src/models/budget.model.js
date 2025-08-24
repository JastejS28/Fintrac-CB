import mongoose from 'mongoose';

const  budgetSchema= new mongoose.Schema({
userId:{
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
},
limit:{
    type: Number,
    required: true
},
category:{
    type: String,
    required: true,
    trim: true
}

},{timestamps:true}) 

// Create a compound index to ensure a user can only have one budget per category
budgetSchema.index({ userId: 1, category: 1 }, { unique: true });


const Budget = mongoose.model('Budget', budgetSchema)

export default Budget;