import mongoose, { Schema } from 'mongoose';

const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        tirm:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6
    },
},  {
        timestamps: true
    })


const User= mongoose.model("User", userSchema);    //"Hey Mongoose, make a model named User using this schema, and I’ll use the variable User in my code to interact with it."  given for 1st one- it will create a collection named users automatically — notice the plural form

export default User;    


















