import { connectDB, cookieSetter, generateToken } from "@/utils/features";
//import { serialize } from "cookie";
import {User} from "../../../models/user"
import bcrypt from "bcrypt"
const { asyncError, errorHandler } = require("@/middlewares/error");


const handler=asyncError(async(req,res)=>{
    if(req.method !=="POST")
        return errorHandler(res,400,"only post method allowed");

const {email,password}=req.body;
 
if(!email || !password) return errorHandler(res,400,"Please enter all fields");
await connectDB();

const user=await User.findOne({email}).select("+password");


if(!user) return errorHandler(res,400,"invalid email! or password");



const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch) return errorHandler(res,400,"invalid email! or password");


const token=generateToken(user._id);
cookieSetter(res,token, true);

res.status(200).json({
    success:true,
    message:`Welcome ${user.name }`,
    user,
});


});

export default handler;