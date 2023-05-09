import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { connectDB } from "@/utils/features";
import { checkAuth } from "@/utils/features";
//import  Jwt from "jsonwebtoken";




const handler = asyncError(async (req, res) => {
    await connectDB();
    const user=await checkAuth(req);
    if(!user) return errorHandler(res,401,"Login First!!!!")
    //console.log(req.query)
    const taskId=req.query.id;
    const task=await Task.findById(taskId);
    if(!task) return errorHandler(res,404,"Task not found");
    if(req.method ==="PUT"){
   

        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success:true,
            message:"task updated successfull",
        })

    }
    else if(req.method ==="DELETE"){
        
        await task.deleteOne();
        res.status(200).json({
            success:true,
            message:"task deleted successfull",
        })
    }
    else{
        return errorHandler(res,400,"only put and delete method allowed");
    }
       
    
  ///await connectDB();
 //// const user=await checkAuth(req);
//   if(!user) return errorHandler(res,401,"Login First!!!!")
const todos=await Task.find({user:user._id})
  res.json({
    success: true,
    todos,
  });
});



export default handler;
