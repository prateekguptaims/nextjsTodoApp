"use client";

import Link from "next/link";
import { useState,createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

export const Context=createContext({user:{}})
export const ContextProvider=({children})=>{
    
    const [user, setuser] = useState({});
    useEffect(() => {
        fetch("/api/auth/me").then((res)=>res.json()).then(data=>{
            if(data.success) setuser(data.user)
        })
    }, [])
    
    
    return(
        <Context.Provider value={{
            user, 
        setuser 
        }}>
            {children}
            <Toaster/>
        </Context.Provider>
    )
    
}

export const Logoutbtn=()=>{    
        const {user,setuser}= useContext(Context);
const logouthandler=async()=>{
    //alert("Loggged out")
    try {
        const res=await fetch("/api/auth/logout");

         const data=await res.json();
         if(!data.success)
         return toast.error(data.message)
        setuser({});
         toast.error(data.message)

    
    } catch (error) {
        toast.error(error)
    }
}
    return(
        <>
        {
            user._id? (<button onClick={logouthandler} className="btn"> Logout</button>)
            :(<Link href={"/login"}>Login</Link>  )
        }
        
        
        
        </>
    )
}

export const TodoButon=({id,completed})=>{
    const router= useRouter();
    
    const deleteHandler=async(id)=>{
       // alert(`deleting, ${id}`)
       try {
        const res=await fetch(`/api/task/${id}`,{
            method:"DELETE",

        });
        const data= await res.json();
        if(!data.success) return toast.error(data.message);
        toast.success(data.message)
        router.refresh();
           } catch (error) {
           return toast.error(error);
       }
    }
    const updateHandler=async(id)=>{
        // alert(`deleting, ${id}`)
        try {
         const res=await fetch(`/api/task/${id}`,{
             method:"PUT",
 
         });
         const data= await res.json();
         if(!data.success) return toast.error(data.message);
         toast.success(data.message)
         router.refresh();
            } catch (error) {
            return toast.error(error);
        }
     }
    
    return    <>  
    <input type="checkbox" name=""   checked={completed} onChange={()=>updateHandler(id)}/>
    <button className="btn"  onClick={()=>deleteHandler(id)}>Delete</button>
    </>
}

