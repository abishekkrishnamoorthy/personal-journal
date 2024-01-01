import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='loginpanel'>
        <h1>SIGN IN</h1>
        <form action="" className='formlogin'>
        <input type="text" required 
               id='userid'
               />
        <input type="text" required 
               id='userid'
               />
        <button>LOGIN</button>       
       </form>
      <Link to="/signup">Don't have an account?Register here</Link>
    </div>
  )
}

export default Login