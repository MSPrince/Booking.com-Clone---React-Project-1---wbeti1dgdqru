import React from 'react'
import './profile.css';

export const Profile = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('loginUserDetails'));
  return (
    <section className='profile-page parent-container'>
      <div className='profile-container child-container'>
    {userDetails && <div className='profile-details'>
        <h1>Personal Details</h1>
        <p>Name: {userDetails.name}</p>
        <p>Email: {userDetails.email}</p>
    </div>}
      </div>
    </section>
  )
}
