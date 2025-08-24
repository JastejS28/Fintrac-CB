import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router= express.Router();


//USER
router.post("/register",registerUser);
router.post("/login",loginUser)

//MIDDLEWARE
router.get("/profile",protect,(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
})

export default router;