import { Router } from "express";
import { protectedRoutes } from "../../middleware/auth.js";
import { role } from "../../utils/common/enum.js";
import { addCompany, deleteCompany, getApplicationsForJobs, getCompany, getCompanyBySearchName, updateCompany } from "./company.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCompanyValidation, paramsIdValidation, updateCompanyValidation } from "./company.validation.js";

const companyRouter=Router();

//add company
companyRouter.post('/',validation(addCompanyValidation),protectedRoutes(role.COMPANY_HR),addCompany);

//update company
companyRouter.put('/:id',validation(updateCompanyValidation),protectedRoutes(role.COMPANY_HR),updateCompany)

//delete company
companyRouter.patch('/:id',validation(paramsIdValidation),protectedRoutes(role.COMPANY_HR),deleteCompany)

//get company by serach name
companyRouter.get('/search',protectedRoutes([role.COMPANY_HR,role.USER]),getCompanyBySearchName);

//get company
companyRouter.get('/:id',validation(paramsIdValidation),protectedRoutes(role.COMPANY_HR),getCompany)


//get all applications for all jobs created by a specific company
companyRouter.get('/:id/applications',protectedRoutes(role.COMPANY_HR),getApplicationsForJobs)

export default companyRouter;