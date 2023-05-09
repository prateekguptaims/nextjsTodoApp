import React from 'react'
import Link from 'next/link'
import {Logoutbtn} from "../components/Clients"
const Header = () => {
  return (
    <div className='header'>
      <div>
        <h2>ToDo</h2>
      </div>
      <article>
        <Link href={"/"}>Home</Link>
        <Link href={"/profile"}>Profile</Link>
        {/* */}
        <Logoutbtn />
        
      </article>
    </div>
  )
}

export default Header