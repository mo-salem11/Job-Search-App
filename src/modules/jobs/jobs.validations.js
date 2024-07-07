import Joi from 'joi';
import { jobLocation, seniorityLevel, workingTime } from '../../utils/common/enum.js';


const addJobValidation = Joi.object({
    jobTitle: Joi.string().required(),
  
    jobLocation: Joi.string().valid(...Object.values(jobLocation)).required(),
    workingTime: Joi.string().valid(...Object.values(workingTime)).required(),
    seniorityLevel: Joi.string().valid(...Object.values(seniorityLevel)).required(),
    
    jobDescription: Joi.string().required(),
    
    // If technicalSkills and softSkills are optional, this is fine
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
  
  });
  
   const updateJobValidation = Joi.object({
    jobTitle: Joi.string().optional(),
    jobLocation: Joi.string().valid(...Object.values(jobLocation)).optional(),
    workingTime: Joi.string().valid(...Object.values(workingTime)).optional(),
    seniorityLevel: Joi.string().valid(...Object.values(seniorityLevel)).optional(),
    jobDescription: Joi.string().optional(),
    technicalSkills: Joi.array().items(Joi.string()).optional(),
    softSkills: Joi.array().items(Joi.string()).optional(),
  }).min(1);

  const paramsIdValidation = Joi.object({
    id: Joi.string().hex().length(24).required()
})
export{
    addJobValidation,
    updateJobValidation,
    paramsIdValidation
}