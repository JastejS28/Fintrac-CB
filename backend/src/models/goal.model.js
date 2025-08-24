import  mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    targetAmount:{
        type:Number,
        required:true
    },
    currentAmount:{
        type:Number,
        required:true,
        default:0
    },
    targetDate:{
        type:Date,
    }
},{timestamps:true})

const Goal = mongoose.model("Goal",goalSchema)
export default Goal;