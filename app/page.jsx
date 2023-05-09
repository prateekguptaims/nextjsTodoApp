import React, { Suspense } from 'react'
import Form from './addTodoForm'

import Todos from './todos';

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


const Page = async() => {
 
  return (
    <div className='container'>
<Form />
<Suspense >

      <Todos />
</Suspense>
    </div>
  )
}

export default Page