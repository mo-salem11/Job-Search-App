import { Router } from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import { changePassword, checkCode, forgetPassword, resetPassword, signin, signup ,verifyAccount} from "./auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { changePasswordValidation, checkCodeValidation, forgetPasswordValidation, resetPasswordValidation, signInValidation, signUpValidation } from "./auth.validation.js";
import { protectedRoutes } from "../../middleware/auth.js";
import { role } from "../../utils/common/enum.js";

const authRouter=Router();

//sign up
authRouter.post('/signup',validation(signUpValidation),checkEmail,signup)

//verify account
authRouter.get('/verify-account',verifyAccount)

//signin
authRouter.post('/sign-in',validation(signInValidation),signin)


//change password
authRouter.patch('/change-password',protectedRoutes([role.USER, role.COMPANY_HR]), validation(changePasswordValidation), changePassword)

//forget password
authRouter.post('/forget-password',protectedRoutes([role.USER, role.COMPANY_HR]) ,validation(forgetPasswordValidation), forgetPassword)
//check code
authRouter.post('/check-code',protectedRoutes([role.USER, role.COMPANY_HR]) ,validation(checkCodeValidation),checkCode);
//reset Password
authRouter.post("/reset-password",protectedRoutes([role.USER, role.COMPANY_HR]),validation(resetPasswordValidation),resetPassword)


export default authRouter;
