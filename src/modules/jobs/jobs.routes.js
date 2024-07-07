import {  Router } from "express";
import { validation } from "../../middleware/validation.js";
import { addJobValidation, paramsIdValidation, updateJobValidation } from "./jobs.validations.js";
import { protectedRoutes } from "../../middleware/auth.js";
import { addJob, deleteJob, getAllFilteredJobs, getAllJobsWithCompanyInfo, getJobsForCompany, updateJob } from "./jobs.controller.js";
import { role } from "../../utils/common/enum.js";



const jobRouter=Router();

//add job
jobRouter.post('/',validation(addJobValidation),protectedRoutes(role.COMPANY_HR),addJob)

//update job
jobRouter.put('/:id',validation(updateJobValidation),protectedRoutes(role.COMPANY_HR),updateJob)

//delete job
jobRouter.patch('/:id',validation(paramsIdValidation),protectedRoutes(role.COMPANY_HR),deleteJob)

//get all jobs with their company
jobRouter.get('/',protectedRoutes([role.USER, role.COMPANY_HR]),getAllJobsWithCompanyInfo)

//get all jobs with filters
jobRouter.get('/filter',protectedRoutes([role.USER, role.COMPANY_HR]),getAllFilteredJobs)

//get all jobs based on specific company
jobRouter.get('/:id',protectedRoutes([role.USER, role.COMPANY_HR]),getJobsForCompany)



export default jobRouter