import {  Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import React ,{ useEffect, useState } from "react";
import Dash from "./pages/Dash";
import apiRequest from './apiRequest'
import Memories from "./pages/Memories";
import Calender from "./pages/Calender";
import CreatePost from "./pages/Createpost";
import Profile from "./pages/Profile";
import Readpost from "./pages/Readpost";
// import 'react-calendar/dist/Calendar.css';
function App() {
     const url="http://localhost:5000/user"
     const [auth, setauth]=useState(false)
     const [user, setuser]=useState([])
     const [username, setusername]=useState("")
     const [password, setpassword]=useState("")
     const [cudetails,setcudetails]=useState([])
     const navigate=useNavigate()
     const location=useLocation()
    
     useEffect(() => {
      // Clear access token and local storage data when route goes back to '/login'
      if (location.pathname === '/login') {
        setcudetails([])
        localStorage.removeItem('accessToken');
        localStorage.removeItem('cudetails');
      }
    }, [location]);

     useEffect(() => {
      const storedCudetails = localStorage.getItem('cudetails');
      if (storedCudetails) {
        setcudetails(JSON.parse(storedCudetails));
      }
    },[localStorage.getItem('accessToken')]);
    console.log(cudetails._id)



     useEffect(() => {
      
      const fetchUsers = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            throw new Error('Access token not found');
          }
    
          const response = await fetch('http://localhost:3500/users', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          
          const data = await response.json();
          setuser(data);
          console.log(user);
          setauth(true);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
          setauth(false);
        }
      };
    
      // Call fetchUsers initially
      fetchUsers();
      
      // Set up an interval to fetch data every minute
      const intervalId = setInterval(fetchUsers, 6000); // 60000 milliseconds = 1 minute
    
      // Clean-up function to clear the interval when the component unmounts or when user changes
      return () => clearInterval(intervalId);
    }, [auth]);


    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3500/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password, roles:["user"]})
        });
    
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.accessToken); 
          // Fetch user details after successful login
          // Fetch user details after successful login
        const userResponse = await fetch(`http://localhost:3500/users/data/${username}`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          localStorage.setItem('cudetails', JSON.stringify(userData));
          navigate('/home');
          setcudetails(userData)
          setauth(true);
        } else {
          throw new Error('Failed to fetch user details');
        }
        } else {
          const errorData = await response.json();
          alert(errorData.message); // Display error message from backend
          setauth(false);
        }
        
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    };
    
       const [uid,setuid]=useState('')
       const [email,setemail]=useState('')
       const [regpassword,setregpassword]=useState('')
       const [conpass,setconpass]=useState('')
       // registration
       const handlereg=async(e)=>{
              e.preventDefault()
              console.log(passvalidation())
              if(passvalidation()===regpassword){    
              const newuser={username:uid,password:regpassword,roles:["user"]}
              // Assuming new user data is stored in a variable called `newUserData`
              const response = await fetch('http://localhost:3500/users', {
              method: 'POST',
              headers: {
                      'Content-Type': 'application/json'
                        },
              body: JSON.stringify(newuser) // Pass the new user data in the request body
              });

              if (!response.ok) {
                           throw new Error('Failed to create user');
            }

            const data = await response.json();
            // Handle the response data as needed 
            console.log(data);
            navigate('/login')
              }else{
                  console.log("error")
                  navigate("/signup")}
                    }

       const passvalidation=()=>{
            if(regpassword===conpass){
              return regpassword
            }
            else{
              return "wrong"
            }
       }


  const [jpost,setjpost]=useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      // Handle the case where access token is not available
      return;
    }
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3500/posts/user/${cudetails._id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          // Handle error responses
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        console.log(data)
        setjpost(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
      
      // Set up an interval to fetch data every minute
      const intervalId = setInterval(fetchPosts, 6000); // 60000 milliseconds = 1 minute
    
      // Clean-up function to clear the interval when the component unmounts or when user changes
      return () => clearInterval(intervalId);
  }, [auth,cudetails]);
  console.log(jpost)
     
  return (
    <div>
      <Routes>
        <Route path="/"      element={<Login user={user}
                                        Login handlelogin={handleLogin}
                                        username={username}
                                        setusername={setusername}
                                        password={password}
                                        setpassword={setpassword}/>}/>
        <Route path="/login" element={<Login handlelogin={handleLogin}
                                        username={username}
                                        setusername={setusername}
                                        password={password}
                                        setpassword={setpassword}
                                        cudetails={setcudetails}/>}/>
        <Route path="/signup" element={<Signup uid={uid}
                                               setuid={setuid}
                                               email={email}
                                               setemail={setemail}
                                               password={regpassword}
                                               setpassword={setregpassword}
                                               conpass={conpass}
                                               setconpass={setconpass}
                                               handle={handlereg}/>}/>
        <Route path="/home" element={auth?<Dash cudetails={cudetails}
                                                post={jpost}/>:<p>wrong password or session timeout</p>}/>
      <Route path="/memories" element={auth?<Memories  cudetails={cudetails}
                                                       post={jpost}
                                                       user={user}
                                                       setcudetails={setcudetails}/>:<p>session timeout</p>}/>
      <Route path="/calendar" element={auth?<Calender cudetails={cudetails}
                                                       jpost={jpost}/>:<p>session timeout</p>}/>
      <Route path="/home/newpost" element={auth?<CreatePost cudetails={cudetails}/>:<p>session timeout</p>}/>
      <Route path="/profile" element={auth?<Profile cudetails={cudetails}
                                                     post={jpost}
                                                     setcudetails={setcudetails}/>:<p>session timeout</p>}/>
      <Route path="/post/:id" element={auth?<Readpost cudetails={cudetails}
                                                     post={jpost}
                                                     setcudetails={setcudetails}/>:<p>session timeout</p>}/>
      </Routes>
    </div>
  );
}

export default App;
