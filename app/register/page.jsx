"use client";

import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {Context} from "../../components/Clients"
//import React from 'react'

const Page = () => {


  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const {user,setuser} = useContext(Context)

  const registerHandler=async(e)=>{
    e.preventDefault();
    try {
    const res=await fetch("/api/auth/register",{
        method:"POST",
        body:JSON.stringify({
         name, email,password
        }),
        headers:{
          "Content-Type":"application/json",
        }

      });
     // console.log(data)
      const data=await res.json();
      if(!data.success)
       return toast.error(data.message);
        setuser(data.user)
      toast.success(data.message)
      //console.log(data)
    } catch (error) {
      toast.error(error);
    }
  }


  if(user._id) return redirect("/") ;
  return (
    <div className="login">
        <section>
            <form action="" onSubmit={registerHandler}>
                <input type="text" name="" id="" placeholder='enter name' value={name} onChange={(e)=>setname(e.target.value)}/>
                <input type="email" name="" id="" placeholder='enter username' value={email} onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" name="" id="" placeholder='enter password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
                <button type="submit">Sign Up</button>
                <p>or</p>
                <Link href={"/login"}>Login</Link>
            </form>
        </section>
    </div>
  )
}

export default Page