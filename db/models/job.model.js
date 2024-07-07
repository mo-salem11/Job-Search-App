import { Schema,model } from "mongoose";
import { jobLocation, seniorityLevel, workingTime } from "../../src/utils/common/enum.js";



const schema=new Schema({
    jobTitle: { type: String, required: true },
    jobLocation: 
    {   type: String, 
        enum: Object.values(jobLocation) ,//['onsite', 'remotely', 'hybrid'], 
        required: true 
    },
    workingTime: 
    { 
        type: String, 
        enum: Object.values(workingTime),   //['part-time', 'full-time'], 
        required: true 
    },
    seniorityLevel: 
    { 
        type: String, 
        enum:  seniorityLevel, //['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
         required: true 
    },
    jobDescription: { type: String, required: true },
    technicalSkills: { type: [String], required: true },
    softSkills: { type: [String], required: true },
    isDeleted:
    {
      type:Boolean,
      default:false
    },
    company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{
    autoCreate:true,
    timestamps:true,
    versionKey:false
})

export const Job = model('Job', schema);