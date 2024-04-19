import React from 'react'
import './registerloginheader.css'
import { NavLink } from 'react-router-dom'

export const RegisterLoginHeader = () => {
  return (
    <header className='parent-container register-header'>
    <div className='child-container register-header-content'>
      <h3><NavLink to='/'>Booking.com</NavLink></h3>
    </div>
  </header>
  )
}
