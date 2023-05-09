"use client";

import Link from 'next/link'
import React, { useContext, useState } from 'react'
import {Context} from "../../components/Clients"
// import { Redirect } from 'next';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

const Page = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const {user,setuser} = useContext(Context)

  
  
  const loginHandler=async(e)=>{
    e.preventDefault();
    try {
    const res=await fetch("/api/auth/login",{
        method:"POST",
        body:JSON.stringify({
          email,password
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
      console.log(data)
    } catch (error) {
      toast.error(error);
    }
  }
  if(user._id) return redirect("/") ;
  return (
    <div className="login">
        <section>
            <form action="" onSubmit={loginHandler}>
                <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} name="" id="" placeholder='enter username'/>
                <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}  name="" id="" placeholder='enter password'/>
                <button type="submit">Login</button>
                <p>or</p>
                <Link href={"/register"}>New User</Link>
            </form>
        </section>
    </div>
  )
}

export default Page