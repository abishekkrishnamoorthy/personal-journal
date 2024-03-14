import React from 'react'
import Calender from '../common/Calender'
import '../../style/dash.css'
import Profilesection from './Profilesection'
import { Link } from 'react-router-dom'
const Footer = ({cudetails}) => {
  return (
    <div className='footerdash'>
        <Calender/>
        <div className="create">
          <Link to='/home/newpost' className='Link'><button>Write Now</button></Link>
        </div>
    </div>
  )
}

export default Footer