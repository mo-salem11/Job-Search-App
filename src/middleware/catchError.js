import { appError } from "../utils/appError.js"

export function catchError(fn){
    return (req, res, next)=>{
        fn(req,res,next).catch(err =>{
            // console.error('Error caught:', err);
            next(new appError(err.message, err.statusCode))
        })
    }
}