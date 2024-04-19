import React, { useContext, useState } from 'react'
import './travellercountmodal.css'
import { TravellerDetailsContext } from '../TravellerDetailsContext/TravellerDetailsContext';

export const TravellerCountModal = ({ setShowTravellerModal, adultCount, setAdultCount, childCount, setChildCount}) => {

    const {travellerCount, setTravellerCount} = useContext(TravellerDetailsContext);
   
    

    function updateTravellerCount(operation){
        if(travellerCount >= 10 && operation === 'i' ){
            return;
         }
         setTravellerCount((oldCount)=>{
             return operation === "i" ? oldCount + 1 : oldCount - 1;
         })

         
    }
    
    function updateAdultCount(operation){
         if(travellerCount >= 10 && operation === 'i' ){
            return;
         }
        setAdultCount((oldCount)=>{
          return operation === 'i' ? oldCount + 1 : oldCount - 1;
        })
    }

    function updateChildCount(operation){
        if(travellerCount >= 10 && operation === 'i'){
            return;
         }
        setChildCount((oldCount)=>{
            return operation === 'i' ? oldCount + 1 : oldCount - 1;
        })
    }
  return (
    <div className='traveller-count-modal box-shadow'>
       <div className='traveller-count-content'>

           <div className='flight-adult-container'>
            <div className='traveller-category'>
                <span>Adult</span>
                <small className='traveller-age-discription'>Age 18+</small>
            </div>
            <div className='btn-count'>
                <button className='counter-btn' onClick={()=>{
                    updateTravellerCount('d');
                   updateAdultCount('d');
                }}
                disabled={adultCount <= 1}>-</button>
                <span>{adultCount}</span>
                <button className='counter-btn' onClick={()=>{
                    updateTravellerCount('i');
                    updateAdultCount('i');
                }}>+</button>
            </div>
           </div>

           <div  className='flight-adult-container'>
            <div className='traveller-category'>
                <span>Children</span>
                <small  className='traveller-age-discription'>Age 0-17</small>
            </div>
            <div className='btn-count'>
                <button className='counter-btn' onClick={()=>{
                    updateTravellerCount('d');
                    updateChildCount('d');
                }}
                disabled={childCount <= 0}>-</button>
                <span>{childCount}</span>
                <button className='counter-btn' onClick={()=>{
                    updateTravellerCount('i');
                    updateChildCount('i');
                }}>+</button>
            </div>
           </div>

           <div>
            <button className='white-btn' onClick={()=>setShowTravellerModal(false) }>Done</button>
           </div>
       </div>
        </div>
  )
}
