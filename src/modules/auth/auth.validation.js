import Joi from 'joi';
import { role } from '../../utils/common/enum.js';


  const signUpValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword:Joi.valid(Joi.ref('password')).required(),
    recoveryEmail: Joi.string().email().optional(),
    DOB: Joi.date().required(),
    mobileNumber: Joi.string().required(),
    role: Joi.string().valid(...Object.values(role)).required(),
    company: Joi.string().hex().length(24).required()
  });
 

  const signInValidation = Joi.object({
    emailOrMobile: Joi.string().required(),
    password: Joi.string().required()
  });

  const changePasswordValidation = Joi.object({   
    oldPassword:Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    newPassword : Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    reNewPassword:Joi.valid(Joi.ref('newPassword')).required()
})


  const forgetPasswordValidation = Joi.object({
    email: Joi.string().email().required()
  });
  
  const checkCodeValidation = Joi.object({
    code:Joi.string().required(),
    email:Joi.string().email().required()
})

const resetPasswordValidation = Joi.object({
    email:Joi.string().email().required(),
    newPassword: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    reNewPassword: Joi.valid(Joi.ref('newPassword')).required()
})

export{
    signUpValidation,
    forgetPasswordValidation,
    changePasswordValidation,
    signInValidation,
    resetPasswordValidation,
    checkCodeValidation
    

}