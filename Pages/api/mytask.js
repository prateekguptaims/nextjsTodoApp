import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDB } from "@/utils/features";
import { checkAuth } from "@/utils/features";
//import  Jwt from "jsonwebtoken";




const handler = asyncError(async (req, res) => {
    if(req.method !=="GET")
        return errorHandler(res,400,"only get method allowed");
    
  await connectDB();
  const user=await checkAuth(req);
  if(!user) return errorHandler(res,401,"Login First!!!!")
const todos=await Task.find({user:user._id})
  res.json({
    success: true,
    todos,
  });
});



export default handler;
