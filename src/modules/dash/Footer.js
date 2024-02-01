import React from 'react'
import Calender from '../common/Calender'
import '../../style/dash.css'
import Profilesection from './Profilesection'
const Footer = () => {
  return (
    <div className='footerdash'>
        <Profilesection/>
        <Calender/>
    </div>
  )
}

export default Footer