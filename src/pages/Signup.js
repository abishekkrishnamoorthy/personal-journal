import React, { useState } from 'react'
import Header from '../modules/common/Header'
import { Navigate, useNavigate } from 'react-router-dom'



const Signup = ({uid,setuid,email,setemail,password,setpassword,conpass,setconpass,handle}) => {
         
  return (
    <div className="App">
    <Header/>
    <div className='signuppanel'>
        <h1>SIGN UP</h1>
        <form  action='/login' className='formsignup' onSubmit={handle}>
        <input type="text" required 
               id='name'
               placeholder='NAME'
               value={uid}
               onChange={(e)=>setuid(e.target.value)}
               />
         <input type="date" required 
               id='date'
               placeholder='DOB'
               />
        <input type="email" required 
               id='email'
               placeholder='EMAIL'
               value={email}
               onChange={(e)=>setemail(e.target.value)}
               />
        <input type="password" required 
               id='password'
               placeholder='password'
               value={password}
               onChange={(e)=>setpassword(e.target.value)}
               />
        <input type="text" required 
               id='conpassword'
               placeholder='confrim password'
               value={conpass}
               onChange={(e)=>setconpass(e.target.value)}
               />               
        <button>create account</button>       
       </form>
       
    </div>
    </div>
  )
}

export default Signup