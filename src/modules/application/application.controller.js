import { Application } from "../../../db/models/application.model.js";
import { Job } from "../../../db/models/job.model.js";
import { catchError } from "../../middleware/catchError.js";
import { appError } from "../../utils/appError.js";
import { cloudinaryConfig } from "../../utils/cloudinaryConfig.js";
import { messages } from "../../utils/common/messages.js";


const applyToJob =catchError(async(req,res,next)=>{
    const { jobId, userTechSkills, userSoftSkills } = req.body;
    const userId = req.authUser._id;

// Check if the job exists
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new appError(messages.job.notFound, 404));
  }
   
  // Check if resume file is provided
  if (!req.file) {
    return next(new appError(messages.application.isRequired, 400));
  }
   
  // Upload resume to Cloudinary
  const result = await cloudinaryConfig().uploader.upload(req.file.path, {
    resource_type: 'auto',
    upload_preset: 'unsigned_upload',
    public_id: `${userId}_resume`,
    allowed_formats: ['pdf'],
  });
    console.log(result);
      // Create a new application
  const application = await Application.create({
     jobId,
    userId,
    userTechSkills,
    userSoftSkills,
    userResume: result.secure_url,
  })

  res.status(201).json({
    success: true,
    data: application,
  });
})

export{
    applyToJob
}