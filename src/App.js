import {  Route, Routes} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import React ,{ useEffect, useState } from "react";
import Dash from "./Dash";

function App() {
     const url="http://localhost:5000/user"
     const [auth, setauth]=useState()
     const [user, setuser]=useState([])
     const [userid, setuserid]=useState(" ")
     const [passcode, setpasscode]=useState(" ")
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

      const handlelogin= async(e)=>{
        e.preventDefault()
        const getuser= user.filter(i=>i.username===userid)
        const bool= getuser.map(i=>i.username === userid && i.passcode===passcode? true: false)
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
