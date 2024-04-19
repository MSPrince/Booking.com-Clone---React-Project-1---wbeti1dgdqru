import React from 'react'
import './headingTopIcons.css';
import { RxQuestionMarkCircled } from "react-icons/rx";


export const HeadingTopIcons = () => {
  return (
    <div className='headingTopIconsContainer'>
         
         <div className='topIcons'>
         <span className='inr'>INR</span>
         </div>

         <div className='topIcons'>
         <img src="/images/IndiaFlag.png" className='indiaFlag' alt="India" />
         </div>

         <div className='topIcons'>
         <RxQuestionMarkCircled className='questionMark'/>
         </div>

         <div className='topIcons'>
         <span >List your property</span>
         </div>
    </div>
  )
}
