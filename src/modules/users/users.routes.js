import { Router } from "express";
import { deleteUserAccount, getAccountsByRecoveryEmail, getAnothorUserAccount, getUserAccount, updateUserAccount } from "./users.controller.js";
import { protectedRoutes } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { recoveryEmailValidation, updateAccountValidation } from "./users.validation.js";



const userRouter=Router();

//Get user account data 
userRouter.get('/',protectedRoutes,getUserAccount);


//Get all accounts associated to a specific recovery Email
userRouter.get('/recovery-email',protectedRoutes,validation(recoveryEmailValidation),getAccountsByRecoveryEmail )

//Get profile data for another user 
userRouter.get('/:id',getAnothorUserAccount) 

//delete user account
userRouter.patch('/',protectedRoutes,deleteUserAccount);

//update user account
userRouter.put('/',protectedRoutes,validation(updateAccountValidation),updateUserAccount)


export default userRouter;