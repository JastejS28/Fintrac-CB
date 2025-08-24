import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/errorWrapper.js';

export const registerUser= ErrorWrapper( async (req, res, next) =>{
    const {username, email, password}= req.body;

    if(!username || !email || !password){ 
        throw new ErrorHandler(400,"Enter the details");
    }
    const existingUser= await User.findOne({email});

    if(existingUser){
        throw new ErrorHandler(500,"User already exists");
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    const newUser= await User.create({
        username,
        email,
        password: hashedPassword
    });

    const token= jwt.sign(
        //MongoDB automatically adds a unique _id field to every single document (record) you create
    {id: newUser._id},                 // Argument 1: The Payload
        process.env.JWT_SECRET,        // Argument 2: The Secret Key
        {expiresIn: "1d"}              // Argument 3: The Options
    )

    res.status(201).json({
        success:true,
        message:"User registered successfully",
        token,
        user: {
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
        },

    })
})


export const loginUser = ErrorWrapper( async (req,res,next)=>{
    const {email,password}= req.body;

    if(!email || !password){
        throw new ErrorHandler(400,"Enter the details");
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ErrorHandler(404,"User not found");
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new ErrorHandler(400,"Invalid credentials");
    }

    const token = jwt.sign(     //If the user exists and the password is correct, we create a new JWT (their digital ID card) and send it back, 
        {id: user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.status(200).json({
        sucess:true,
        message:"User LoggedIn Successfully",
        token,
        user: {
            id:user._id,
            username: user.username,
            email:user.email
        }
    })
})