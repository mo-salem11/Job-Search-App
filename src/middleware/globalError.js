export const globalError = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    
    if(process.env.MODE == 'development'){
        res.status(err.statusCode||500).json({message:err.message, stack:err.stack,success:false})
    }else{
        res.status(err.statusCode||500).json({message:err.message,success:false})
    }
}