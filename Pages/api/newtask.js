import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";
import mongoose from "mongoose";



const handler = asyncError(async (req, res) => {
    if(req.method !=="POST")
        return errorHandler(res,400,"only post method allowed");
    
  await connectDB();

  const { title, description } = req.body;

  if(!title || !description) return errorHandler(res,400,"please enter all field")

  const user=await checkAuth(req);
  if(!user) return errorHandler(res,401,"Login First!!!!")

  await Task.create({
    title,
    description,
    user: user._id,
  });

  res.json({
    success: true,
    message:"task create"
  });
});



export default handler;
