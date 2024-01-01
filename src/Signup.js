import React from 'react'
import Header from './Header'


const Signup = () => {
  return (
    <div className="App">
    <Header/>
    <div className='signuppanel'>
        <h1>SIGN UP</h1>
        <form  action='/login' className='formsignup'>
        <input type="text" required 
               id='userid'
               placeholder='NAME'
               />
         <input type="date" required 
               id='userid'
               placeholder='DOB'
               />
        <input type="email" required 
               id='userid'
               placeholder='EMAIL'
               />
        <input type="password" required 
               id='userid'
               placeholder='PASSCODE'
               />
        <input type="text" required 
               id='userid'
               placeholder='confrim PASSCODE'
               />               
        <button>create account</button>       
       </form>
       
    </div>
    </div>
  )
}

export default Signup