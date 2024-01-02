import {  Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import React ,{ useEffect, useState } from "react";
import Dash from "./Dash";
import { toast } from "react-toastify";

function App() {
     const url="http://localhost:5000/user"
     const [auth, setauth]=useState(false)
     const [user, setuser]=useState([])
     const [userid, setuserid]=useState("")
     const [passcode, setpasscode]=useState("")
     const navigate=useNavigate()
     useEffect(()=>{
      const fetch_data=async ()=>{
        try {
          const res=await fetch(url)
          if(!res.ok) throw Error("error")
          const users= await res.json()
          setuser(users)
        } catch (error) {
          
        }  
      }
        fetch_data()},[])
    useEffect(()=>{
      
    },[auth])
    const handlelogin= async(e)=>{
      e.preventDefault()
      const getuser= user.filter(i=>i.username === userid && i.passcode===passcode)
      const bool=()=>{
        if(getuser.length){
          
          return true
        }else{
          
          return false
        }
      }
      bool()? navigate('/da'):navigate('/login')
      setauth(bool)
    }
      
  return (
    <div>
      <Routes>
        <Route path="/"      element={<Login user={user}
                                        Login handlelogin={handlelogin}
                                        userid={userid}
                                        setuserid={setuserid}
                                        passcode={passcode}
                                        setpasscode={setpasscode}/>}/>
        <Route path="/login" element={<Login handlelogin={handlelogin}
                                        userid={userid}
                                        setuserid={setuserid}
                                        passcode={passcode}
                                        setpasscode={setpasscode}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/da" element={auth?<Dash/>:<Login handlelogin={handlelogin}
                                        userid={userid}
                                        setuserid={setuserid}
                                        passcode={passcode}
                                        setpasscode={setpasscode}/>}/>
      </Routes>
    </div>
  );
}

export default App;
