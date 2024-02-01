import {  Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import React ,{ useEffect, useState } from "react";
import Dash from "./pages/Dash";
import apiRequest from './apiRequest'
import Memories from "./pages/Memories";
import Calender from "./pages/Calender";

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
          setauth(true) 
          setuser(users)
        } catch (error) {
          
        }  
      }
    fetch_data()},[user])
    useEffect(()=>{
      
    },[auth,user])
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

       const [uid,setuid]=useState('')
       const [email,setemail]=useState('')
       const [regpasscode,setregpasscode]=useState('')
       const [conpass,setconpass]=useState('')
       
       const handlereg=async(e)=>{
              e.preventDefault()
              console.log(passvalidation())
              if(passvalidation()===regpasscode){    
                 const id= user.length ? user[user.length-1].id+1:1
                 const newuser={id,username:uid,email:email,passcode:regpasscode}
                 const newdata={...user,newuser}
                 setuser(newdata)
                 const postoption={
                     method: 'POST',
                     headers: {'Content-Type':'application/json'},
                     body: JSON.stringify(newuser)
                   }
                   const result=await apiRequest(url,postoption)
                   console.log(result)
                   navigate('/login')
              }else{console.log("error")
                     navigate("/signup")}
       }
       const passvalidation=()=>{
            if(regpasscode===conpass){
              return regpasscode
            }
            else{
              return "wrong"
            }
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
        <Route path="/signup" element={<Signup uid={uid}
                                               setuid={setuid}
                                               email={email}
                                               setemail={setemail}
                                               passcode={regpasscode}
                                               setpasscode={setregpasscode}
                                               conpass={conpass}
                                               setconpass={setconpass}
                                               handle={handlereg}/>}/>
        <Route path="/da" element={auth?<Dash/>:<Login handlelogin={handlelogin}
                                        userid={userid}
                                        setuserid={setuserid}
                                        passcode={passcode}
                                        setpasscode={setpasscode}/>}/>
      <Route path="/memories" element={<Memories/>}/>
      <Route path="/calendar" element={<Calender/>}/>
      </Routes>
    </div>
  );
}

export default App;
