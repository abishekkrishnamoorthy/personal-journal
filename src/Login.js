import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { ToastContainer } from 'react-toastify'

const Login = ({userid, setuserid, handlelogin, setpasscode, passcode}) => {
  
  return (
   <div className="App">
    <Header/>
    <div className='loginpanel'>
        <h1>SIGN IN</h1>
        <form  className='formlogin' onSubmit={handlelogin}>
        <input type="text" required 
               id='userid'
               placeholder='Username or Email'
               value={userid}
               onChange={(e)=>setuserid(e.target.value)}/>
        <input type="password" required 
               id='passcode'
               placeholder='Passcode'
               value={passcode}
               onChange={(e)=>setpasscode(e.target.value)}
               />
        <button>LOGIN</button>
               
       </form>
      <Link to="/signup">Don't have an account?Register here</Link>
    </div>
    </div>
  )
}

export default Login