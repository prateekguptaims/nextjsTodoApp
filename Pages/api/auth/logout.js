import {  cookieSetter } from "@/utils/features";

const { asyncError, errorHandler } = require("@/middlewares/error");


const handler=asyncError(async(req,res)=>{
    if(req.method !=="GET")
        return errorHandler(res,400,"only Get method allowed");


//const token=generateToken(user._id);
cookieSetter(res,null, false);

res.status(200).json({
    success:true,
    message:`Logout success`,
});


});

export default handler;