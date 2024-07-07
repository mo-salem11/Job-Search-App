import { appError } from "../utils/appError.js"



export const validation = (schema)=>{
    return(req,res,next)=>{
        let filter2 = {...req.body,...req.params,...req.query};
        if(req.file){
            filter2 = { userResume: req.file, ...req.body, ...req.params, ...req.query}
        }
        let {id,keyword,...filter}=filter2;
         if(Object.keys(filter).length === 0)filter={id};         
        const {error} =  schema.validate(filter, {abortEarly:false}) 
        if(!error){
            next()
        }else{
            let errorList = []
            error.details.forEach(val => {
                errorList.push(val.message)
            });
            next(new appError(errorList,401))
        }
    }
}
