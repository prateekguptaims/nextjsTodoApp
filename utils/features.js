import { serialize } from "cookie";
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";
import { User } from "@/models/user";

export const connectDB = async () => {
    // console.log(process.env.MONGO_URI)
    const {connection} = await mongoose.connect(process.env.MONGO_URI, 
        {
      dbName: "NextTodo",
    }); 
    console.log(`Database Connected on ${connection.host}`);
  };

  export const cookieSetter=(res,token,set)=>{
    //const token="SDasda"
    res.setHeader("Set-Cookie",
    serialize("token",set?token:"",{
      path:"/",
      httpOnly:true,
      maxAge:set?15*24*60*60*1000:0 ,

    }))
  }
  export const generateToken=(_id)=>{
    return Jwt.sign({_id},process.env.JWT_SECRET)
  }


 export const checkAuth = async (req) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;

  const token = cookie.split("=")[1];

  const decoded = Jwt.verify(token, process.env.JWT_SECRET);

  return await User.findById(decoded._id);
};