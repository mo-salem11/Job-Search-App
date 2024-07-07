import mongoose from "mongoose";

export const dbConnection =()=> {
    mongoose.connect('mongodb://127.0.0.1:27017/JobSearchDB')
    .then(()=>{console.log("DB is Connected");})
    .catch((err)=>{
        console.log("database error",err);
        // process.exit(1);
    }) 
} 