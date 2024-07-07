import { Schema ,model} from "mongoose";

const schema=new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userTechSkills: { type: [String], required: true },
    userSoftSkills: { type: [String], required: true },
    userResume: { type: String, required: true },
},{
    autoCreate:true,
    timestamps:true,
    versionKey:false
})

export const Application = model('Application', schema);