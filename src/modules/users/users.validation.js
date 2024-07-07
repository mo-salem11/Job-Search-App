import Joi from "joi";

const updateAccountValidation = Joi.object({
    email: Joi.string().email().optional(),
    mobileNumber: Joi.string().optional(),
    recoveryEmail: Joi.string().email().optional(),
    DOB: Joi.date().optional(),
    lastName: Joi.string().optional(),
    firstName: Joi.string().optional()
  });

   const recoveryEmailValidation= Joi.object({
    recoveryEmail: Joi.string().email().required(),
  });

  export{
    updateAccountValidation,
    recoveryEmailValidation
  }