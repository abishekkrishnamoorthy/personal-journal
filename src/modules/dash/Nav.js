import React from 'react'
import Calender from '../common/Calender'

import Home from './Home'
import '../../style/dash.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../common/Header'
import { Avatar } from '@mui/material'
const Nav = ({cudetails}) => {
  const location = useLocation();
  const isCurrentPage = (pathname) => {
    return location.pathname === pathname;
  }
  const navigate=useNavigate('/')
  return (
    <div className='nav' >
     <h1>Daily Echo</h1>
      <ul>
        <Link to="/home" className={`navli ${isCurrentPage('/home')?'cur':'nav-li'}`}>HOME</Link>
        <Link to="/memories" className={`navli ${isCurrentPage('/memories')?'cur':'nav-li'}`}>Collab</Link>
        <Link to="/calendar" className={`navli ${isCurrentPage('/calendar')?'cur':'nav-li'}`}>TimeLine</Link>
      </ul>
      <Link to='/profile' className="profilenav">
      <Avatar sx={{ width:'20%', height:'6vh' , marginLeft:'10px', backgroundColor:'orange'}}>D</Avatar>
      <div className="user">
      <h3>{cudetails.username}</h3>
       <h4>User</h4>
      </div>      
      </Link>
    </div>
  )
}

export default Nav