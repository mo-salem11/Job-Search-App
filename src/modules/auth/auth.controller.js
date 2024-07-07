import { User } from "../../../db/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { messages } from "../../utils/common/messages.js";
import dotenv from 'dotenv';
import { sendEmailForVerify } from "../../services/verifyAccount.js";
import { status } from "../../utils/common/enum.js";
import { appError } from "../../utils/appError.js";
import { nanoid } from "nanoid"
import { sendEmail } from "../../services/sendEmail.js";
dotenv.config();


//SignUp
const signup=catchError(async(req,res,next)=>{
    
    //get data from the user
    const {firstName,lastName,email,password,recoveryEmail,DOB,mobileNumber,role,company}=req.body;

    //prepare user
    const newUser=new User(
        {
            firstName,
            lastName,
            username:firstName+lastName,
            email,
            password,
            recoveryEmail,
            DOB,
            mobileNumber,
            role,
            company
        });
    //save user
    await newUser.save(); 
    //create token
    let token = jwt.sign({userId:newUser._id, role:newUser.role}, process.env.JWT_KEY,{ expiresIn: '5m' })
    //send email for verify
    sendEmailForVerify({
        to:email,
        subject:'Verify your account',
        message:`<p style="background-color:red;text-align:center;color:white;margin-right:4px;font-size:18px;padding:5px 10px">to verify your acount click <a style="color:white;text-weight:bold;font-size:20px;text-decoration:underline;" href="http://localhost:3000/auth/verify-account?token=${token}">here</a></p>`
    }); 
    
    !newUser && next(new AppError('invalid data', 404))
     return res.status(201).json({message:messages.user.createUser,success:true,data:{newUser,token}});
});

//verify the account
const verifyAccount=catchError(async(req,res,next)=>{
    let {token} = req.query;
    if(!token) return next(new appError(messages.token.noToken, 401))
    let decoded = jwt.verify(token, process.env.JWT_KEY)
    if (!decoded) return next(new appError(messages.token.invalidToken, 401))
    let user = await User.findOneAndUpdate({_id:decoded.userId,isverify:false},{isverify:true})
    if (!user) return next(new appError(messages.user.userNotFound, 404))
   return res.status(200).json({message:messages.user.verifyAccount,success:true})
})


//Signin
const signin=catchError(async(req,res,next)=>{
    //get data
    const { emailOrMobile, password } = req.body;
    
  // Find user by email or mobile number
  const user = await User.findOne({
    $and: [
      {
        $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }]
      },
      { isverify: true }
    ]
  });
    // Check if user exists
    
    if (!user) {
        return next(new appError(messages.user.invalidCredentials, 401));
      }

      if(user.isDeleted){
        user.isDeleted=false;
        await user.save();
     }

      // Validate password
      // console.log('Comparing password:', password, 'with hash:', user.password);
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // console.log('Password valid:', isPasswordValid);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new appError(messages.user.invalidCredentials, 401));
  }


   // Update user status to online
   user.status = status.ONLINE;
   await user.save();

   //create token
   const accessToken=jwt.sign({userId:user._id, role:user.role}, process.env.JWT_KEY,{ expiresIn: '10000h' });
   
   res.status(200).json({
    message: messages.user.signInSuccessfully,
    success:true,
    data: accessToken
});
 

})

//change the password of account
const changePassword=catchError(async(req,res,next)=>{
  let { oldPassword, newPassword } = req.body;
    const checkExsist=bcrypt.compareSync(oldPassword, req.authUser.password);
    if (!checkExsist) 
       return next(new appError(messages.user.invalidCredentials, 401)) 

      await User.findByIdAndUpdate(req.authUser._id, { password: newPassword});
      let token = jwt.sign({ userId: req.authUser._id, role: req.authUser.role }, process.env.JWT_KEY)
      return res.json({ message: messages.user.updatePassword, token })
})



//forget password
const forgetPassword=catchError(async(req,res,next)=>{
   const {email}=req.body;
   let user = await User.findOne({ email })
   if (!user) return next(new appError(messages.user.userNotFound, 401))
   
    let resetCode = nanoid(6)
    await User.findOneAndUpdate({ email }, { resetCode })
   
    sendEmail(resetCode,email);
    res.status(200).json({ 
      message: messages.user.resetCodeSuccess,
      success:true,
      "data": {
       "email": email,
        "reset_code_sent": true
  } })


})
const checkCode =catchError(async(req,res,next)=>{
  let { email, code } = req.body
  let verify = await User.findOne({ email: email, resetCode: code })
  if (!verify) return next(new appError(messages.user.invalidCode, 401))
  res.status(200).json({
  success:true,
  message: messages.user.validCode,
  data: {
    email: email,
    reset_code_valid: true
  }
})
});

//reset password
const resetPassword=catchError(async(req,res,next)=>{
  let user = await User.findOneAndUpdate({ email: req.body.email }, { password: req.body.newPassword})
  let token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY);
  res.status(200).json({
    success:true,
    message:messages.user.resetPassSuccess,
    token
  })
})





export{
    signup,
    verifyAccount,
    signin,
    changePassword,
    forgetPassword,
    checkCode,
    resetPassword 
}