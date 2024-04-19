import React from 'react'
import './bookingsuccessmodal.css';
import { useNavigate } from 'react-router-dom';


export const BookingSuccessModal = () => {
    const navigateTo = useNavigate();
  return (
    <div className='bookingSuccessful-modal'>
                <div className='child-container successful-content'>
                    <div className='successfull-message-div'>
                        <h2 className='green-para'>Booking Successful!</h2>
                        <button className='white-btn' onClick={()=>{
                           navigateTo('/')
                        }}>Go back to home  page</button>
                    </div>
                </div>
            </div>
  )
}
