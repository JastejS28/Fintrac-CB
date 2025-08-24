import Goal from '../models/goal.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import ErrorWrapper from '../utils/errorWrapper.js';

export const createGoal= ErrorWrapper(async (req, res, next)=>{
    const {name, currentAmount,targetAmount, targetDate} = req.body;

    if(!name || !targetAmount){
        throw new ErrorHandler(400, "Please provide all required fields");
    }

    const goal = await Goal.create({
        userId: req.user.id,
        name,
        targetAmount,
        targetDate,
        currentAmount
    });

    res.status(200).json({
        success: true,
        data: goal
    });
})


export const getGoals = ErrorWrapper(async (req, res, next) =>{
      const goals = await Goal.find({userId:req.user.id});
      res.status(200).json({
          success: true,
          data: goals
      });
})


export const deleteGoal = ErrorWrapper(async (req, res, next) =>{
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        throw new ErrorHandler(404, "Goal not found");
    }

    if(goal.userId.toString()!==req.user.id){
        throw new ErrorHandler(403, "You are not authorized to delete this goal");
    }
    await goal.deleteOne();

    res.status(200).json({
        success: true,
        message: "Goal deleted successfully"
    });
})


export const updateGoal= ErrorWrapper(async (req,res)=>{
    let goal = await Goal.findById(req.params.id)

    if(!goal){
        throw new ErrorHandler(404, "Goal not found");
    }

if(goal.userId.toString()!= req.user.id){
        throw new ErrorHandler(403, "You are not authorized to update this goal");
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    }); 

    res.status(200).json({
        success: true,
        data: goal
    })

})