import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../modules/common/Header'
import { ToastContainer } from 'react-toastify'

const Login = ({username, setusername, handlelogin, setpassword, password}) => {
  
  return (
   <div className="App">
    <Header/>
    <div className='loginpanel'>
        <h1>SIGN IN</h1>
        <form  className='formlogin' onSubmit={handlelogin}>
        <input type="text" required 
               id='username'
               placeholder='Username'
               value={username}
               onChange={(e)=>setusername(e.target.value)}/>
        <input type="password" required 
               id='password'
               placeholder='password'
               value={password}
               onChange={(e)=>setpassword(e.target.value)}
               />
        <button>LOGIN</button>
               
       </form>
      <Link to="/signup">Don't have an account?Register here</Link>
    </div>
    </div>
  )
}

export default Login