import React from 'react'
import Calender from '../common/Calender'
import Memories from './Memories'
import Home from './Home'
import '../../style/dash.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const Nav = () => {
  const location = useLocation();
  const isCurrentPage = (pathname) => {
    return location.pathname === pathname;
  }
  const navigate=useNavigate('/')
  return (
    <div className='nav ' >
      <ul >
        <Link to="/da" className={`navli ${isCurrentPage('/da')?'cur':'nav-li'}`}>HOME</Link>
        <Link to="/memories" className={`navli ${isCurrentPage('/memories')?'cur':'nav-li'}`}>MEMORIES</Link>
        <Link to="/calendar" className={`navli ${isCurrentPage('/calendar')?'cur':'nav-li'}`}>CALENDER</Link>
      </ul>
      <button >LOG OUT</button>
    </div>
  )
}

export default Nav