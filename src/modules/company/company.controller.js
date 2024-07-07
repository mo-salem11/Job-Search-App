import { Application } from "../../../db/models/application.model.js";
import { Company } from "../../../db/models/company.model.js";
import { Job } from "../../../db/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { apiFeatures } from "../../utils/apiFeatures.js";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/common/messages.js";

//Add company
const addCompany=catchError(async(req,res,next)=>{
    const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;
    const newCompany = await Company.create({
        companyName,
        description,
        industry,
        address,
        numberOfEmployees,
        companyEmail,
        companyHR: req.authUser._id,
      });
      res.status(201).json({
        success:true,
        message:messages.company.createSuccessfully,
        data: {
          company: newCompany,
        },
      });
}) 

//Update company
const updateCompany=catchError(async(req,res,next)=>{
    const { id } = req.params;
     
      // Check if the company belongs to the logged-in user
  if (req.authUser.company.toString() !== id) {
    return next(new appError(messages.company.noAccess, 403));
  }


    const company = await Company.findOne({ _id: id, isDeleted: false });

  if (!company) {
    return next(new appError(messages.company.failedToUpdate, 404));
  }
  // Find and update the company
  const updatedCompany = await Company.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message:messages.company.updateSuccessfully,
    data: updatedCompany,
  });
})

//Delete Company
const deleteCompany=catchError(async(req,res,next)=>{
   const {id}=req.params;

    // Check if the company belongs to the logged-in user
  if (req.authUser.company.toString() !== id) {
    return next(new appError(messages.company.noAccess, 403));
  }

   const company = await Company.findByIdAndUpdate(id, { isDeleted: true }, {
    new: true,
    runValidators: true,
  });
  if (!company) {
    return next(new appError(messages.company.failedToDelete, 404));
  }

  res.status(200).json({
    success: true,
    message: messages.company.deleteSuccessfully,
    data: company,
  });
})

//Get Company
const getCompany=catchError(async(req,res,next)=>{
    const { id } = req.params;

    // Check if company exists and is not soft-deleted
    const company = await Company.findOne({ _id: id, isDeleted: false });
  
    if (!company) {
      return next(new appError(messages.company.notFound, 404));
    }

  // Fetch jobs related to the company
  const jobs = await Job.find({ company: company._id });
    res.status(200).json({
        success: true,
        message: messages.company.getData,
        data: {company,jobs}
      });
})

//get campany by search company's name
const getCompanyBySearchName=catchError(async(req,res,next)=>{
  const features=new apiFeatures(Company.find(), req.query) .filter()
  .sort()
  .fields()
  .pagination()
  .search();
  const companies = await features.mongooseQuery;
   res.status(200).json({
            success: true,
            results: companies.length,
            page: features.pageNumber,
            data: companies
        });
})

// get all applications  for specific Jobs
const getApplicationsForJobs =catchError(async(req,res,next)=>{
  const { id } = req.params;
  // Check if the company belongs to the logged-in user
  if (req.authUser.company.toString() !== id) {
    return next(new appError(messages.company.noAccess, 403));
  }

  // Get all jobs created by the company
  const jobs = await Job.find({ company: id });
  if (!jobs.length) {
    return next(new appError(messages.job.noJobs, 404));
  }

  // Get applications for all jobs
  const jobIds = jobs.map(job => job._id);
  const applications = await Application.find({ jobId: { $in: jobIds } }).populate('userId', 'firstName lastName email mobileNumber status');
  
  res.status(200).json({
    success: true,
    data: applications,
  });

})


export{
    addCompany,
    updateCompany,
    deleteCompany,
    getCompany,
    getCompanyBySearchName,
    getApplicationsForJobs
}