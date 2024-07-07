import { User } from "../../../db/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { messages } from "../../utils/common/messages.js";

//get user account data
const getUserAccount=catchError(async(req,res,next)=>{
    res.status(200).json({
        message: messages.user.getDataSuccessfully,
        data: req.authUser,
        success:true
    })
})

//Get profile data for another user 
const getAnothorUserAccount=catchError(async(req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);
    
    if(!user)return next(new appError(messages.user.userNotFound, 404));
    res.status(200).json({
        message: messages.user.getDataSuccessfully,
        data: user,
        success:true
    })
})

//delete account
const deleteUserAccount=catchError(async(req,res,next)=>{
    await User.findByIdAndUpdate({_id:req.authUser._id},{isDeleted:true});
    return res.status(200).json({
        message: messages.user.deleteAccount,
        success:true
    })
})

//update account
const updateUserAccount=catchError(async(req,res,next)=>{
   const user= await User.updateOne({_id:req.authUser._id},req.body,{new:true,runValidators:true}); 
    const {email,mobileNumber}=req.body;
    if(email||mobileNumber){
        const emailMobileExists = await User.findOne({
            $or: [
              { email: email },
              { mobileNumber: mobileNumber }
            ],
            _id: { $ne: req.authUser._id }, // Exclude the current user from the search
            isDeleted: false
          });
      
          if (emailMobileExists) {
            return next(new AppError(messages.user.userAlreadyExist, 400));
          }
    }
   return res.status(200).json({
        message: messages.user.updateAccount,
        data:user,
        success:true
    })
})


const getAccountsByRecoveryEmail =catchError(async(req,res,next)=>{
    const {recoveryEmail}=req.body;
     // Find users by recovery email
    const users = await User.find({ recoveryEmail });
    if (!users.length) {
        return next(new appError(messages.user.notExsistAccounts, 404));
      }
      res.status(200).json({
        message: "Accounts retrieved successfully",
        data: users,
        success:true});
})

export{
    getUserAccount,
    deleteUserAccount,
    updateUserAccount,
    getAnothorUserAccount,
    getAccountsByRecoveryEmail
}