import { Company } from "../../../db/models/company.model.js";
import { Job } from "../../../db/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { apiFeatures } from "../../utils/apiFeatures.js";
import { appError } from "../../utils/appError.js";
import { messages } from "../../utils/common/messages.js";

//add job
const addJob=catchError(async(req,res,next)=>{
    const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;
     // Create new job
  const newJob = await Job.create({
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy:req.authUser._id,
    company:req.authUser.company
  });
  res.status(201).json({
    success: true,
    message: messages.job.createSuccessfully,
    data: newJob,
  });
})


//update job
const updateJob=catchError(async(req,res,next)=>{
const { id } = req.params;
  const job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job || job.isDeleted) {
    return next(new appError(messages.job.failedToUpdate, 404));
  }

  res.status(200).json({
    success: true,
    message: messages.job.updateSuccessfully,
    data: job,
  });
})

//delete job
const deleteJob=catchError(async (req,res,next)=>{
    const {id}=req.params;

    const job=await Job.findByIdAndUpdate(id,{isDeleted:true},{ new: true, runValidators: true });
    if (!job) {
        return next(new appError(messages.job.failedToDelete, 404));
      }
    
      res.status(200).json({
        success: true,
        message: messages.job.deleteSuccessfully,
        data: job,
      });

})

//get all jobs with their company
const getAllJobsWithCompanyInfo = catchError(async (req, res, next) => {
    const jobs = await Job.find({ isDeleted: false }).populate('company');
  
    if (!jobs || jobs.length === 0) {
      return next(new appError(messages.job.noJobs, 404));
    }
  
    res.status(200).json({
      success: true,
      data: jobs,
    });
  });

//get all jobs based on specific company
const getJobsForCompany = catchError(async (req, res, next) => {
    const { id } = req.params;
    // Check if the company is marked as deleted
  const company = await Company.findOne({ _id: id, isDeleted: false });
    if (!company) {
      return next(new appError(messages.company.notFound, 404));
    }
  
    const jobs = await Job.find({ company: company._id });
  
    res.status(200).json({
      success: true,
      data: jobs,
    });
  });
  

  //Get all Jobs that match workingTime , jobLocation , seniorityLevel and jobTitle,technicalSkills
  const getAllFilteredJobs=catchError(async(req,res,next)=>{
    const features = new apiFeatures(Job.find(), req.query)
    .filter()
    .sort()
    .fields()
    .pagination()
    .filterJobs();

  const jobs = await features.mongooseQuery;

  res.status(200).json({
      success: true,
      results: jobs.length,
      data: jobs
  });
});

export{
    addJob,
    updateJob,
    deleteJob,
    getAllJobsWithCompanyInfo,
    getJobsForCompany,
    getAllFilteredJobs
}