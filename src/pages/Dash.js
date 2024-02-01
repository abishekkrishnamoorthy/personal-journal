import React from 'react'
import Header from '../modules/dash/Header'
import Footer from '../modules/dash/Footer'
import '../style/dash.css'
import Dashmain from '../modules/dash/Dashmain'

const Dash = () => {
  return (
    <div className='dash'>
      <Header/>
      <Dashmain/>
      <Footer/>
    </div>
  )
}

export default Dash