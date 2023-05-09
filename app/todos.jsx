import React from 'react'
import {cookies} from "next/headers";
import { TodoItem } from '@/components/ServerComponents'
import { redirect } from 'next/navigation';
const fetchTdo=async(token)=>{
    try {
      const res= await fetch(`${process.env.URL}/api/mytask`,{
        cache:"no-cache",
        headers:{
          cookie:`token=${token}`,
        }
        
        
      });
      const data= await res.json();
      if(!data.success) return [];
      return data.todos;
    } catch (error) {
      console.log(error)
      
      return [];
    }
  }

const Todos = async() => {
    const token=cookies().get("token")?.value;
  //console.log(token);
//   if(!token) redirect("/login")
   const todos= await fetchTdo(token);
   //todos.sort(function(o){ return o.date });
  return (
    <section className='todosContainer'> 
      
      
      {
        todos?.map((i)=>(

          <TodoItem key={i._id} title={i.title} description={i.description} id={i._id} completed={i.isCompleted}/>
        )
        )
      }
      </section>
    
  )
}

export default Todos