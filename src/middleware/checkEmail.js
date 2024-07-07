import { User } from "../../db/models/user.model.js"
import { appError } from "../utils/appError.js"
import { messages } from "../utils/common/messages.js"
import { catchError } from "./catchError.js"



export const checkEmail = catchError(async(req,res,next)=>{
    let checkEmail = await User.findOne({email:req.body.email,isverify:true})
    if(checkEmail) return next(new appError(messages.user.userAlreadyExist,409))
    next()
})