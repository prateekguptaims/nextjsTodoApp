export const errorHandler=(res,statusCode=500,message="internal server error")=>{
    //if(req.method !=="POST")
    return res.status(statusCode).json({  
         success:false, 
         message ,
               });
}

export const asyncError=(passedFunc)=>(req,res)=>{
   return Promise.resolve(passedFunc(req,res)).catch((err)=>{
   return  errorHandler(res,500,err.message);
    })
}