import Joi from 'joi';


const addCompanyValidation = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  industry: Joi.string().required(),
  address: Joi.string().required(),
  numberOfEmployees: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
});

const updateCompanyValidation = Joi.object({
    companyName: Joi.string().optional(),
    id: Joi.string().hex().length(24).required(),
    description: Joi.string().optional(),
    industry: Joi.string().optional(),
    address: Joi.string().optional(),
    numberOfEmployees: Joi.string().optional(),
    companyEmail: Joi.string().email().optional(),
});

const paramsIdValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export {
    addCompanyValidation,
    updateCompanyValidation,
    paramsIdValidation
} 
