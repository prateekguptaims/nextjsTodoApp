"use client";


import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/Clients';

const AddTodoForm = () => {
 const [title, settitle] = useState("")
 const {user}= useContext(Context)
 
 const [description, setdescription] = useState("")
 const router = useRouter()

 
 const submitHandler=async(e)=>{
  e.preventDefault();
  try {
    const res= await fetch("/api/newtask",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title,
        description,
      }),
    });
    const data= await res.json();
    if(!data.success) return toast.error(data.message);
    toast.success(data.message)
    router.refresh();
    settitle("");
    setdescription("")

  } catch (error) {
    return toast.error(error);
  }

 }
 if(!user._id) return redirect("/login") ;
  return (
    <div className="login">
        <section>
            <form action="" onSubmit={submitHandler}>
                <input type="text" name="" id="" placeholder='enter task' value={title} onChange={(e)=>settitle(e.target.value)}/>
                <input type="text" name="" id="" placeholder='enter description' value={description} onChange={(e)=>setdescription(e.target.value)}/>
                <button type="submit">Add Task</button>
               
            </form>
        </section>
    </div>
  )
}

export default AddTodoForm