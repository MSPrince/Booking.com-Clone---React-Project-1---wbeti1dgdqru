import React, { useState } from 'react'
import './register.css'

import { RegisterForm } from '../../components/RegisterComponents/RegisterForm'
import { RegisterLoginHeader } from '../../components/RegisterLoginHeader/RegisterLoginHeader'
import { useLocation } from 'react-router-dom'
export const Register = () => {
  
  
     

   
  return (

    <section className='register-section'>


      <RegisterLoginHeader/>

        <RegisterForm />
    </section>
  )
}
