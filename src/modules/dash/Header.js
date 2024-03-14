import React from 'react'
import '../../style/dash.css'
import Nav from './Nav'
const Header = ({cudetails}) => {
  return (
    <div className='headerdash'>
        <Nav cudetails={cudetails}/>
    </div>
  )
}

export default Header