import React from 'react'
import Header from '../modules/dash/Header'
import Footer from '../modules/dash/Footer'
import '../style/dash.css'
import Dashmain from '../modules/dash/Dashmain'

const Dash = ({cudetails,post}) => {
  return (
    <div className='dash'>
      <Header cudetails={cudetails}/>
      <div className='dashcon'>
      <Dashmain post={post}/>
      <Footer cudetails={cudetails}/>
      </div>
    </div>
  )
}

export default Dash