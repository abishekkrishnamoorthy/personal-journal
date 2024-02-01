import React from 'react'
import '../../style/dash.css'
import Nav from './Nav'
const Header = () => {
  return (
    <div className='headerdash'>
        <div className="header">
        <h1>Daily Echo</h1>
        </div>
        <Nav/>
    </div>
  )
}

export default Header