import React from 'react'
import './personmodal.css';

export const Personmodal = ({ personCountInfo, setPersonCountInfo, setPersonModal }) => {

function updatePersonInfo(name, operation){
    
    setPersonCountInfo((oldState)=>{
        return {...oldState, [name]: operation === "i" ? personCountInfo[name] + 1 : personCountInfo[name] - 1}
    })
}

    return (


        <div id='person-modal'>

            {/* ADULTS */}
            <div className='info'>
                <span>Adults</span>
               
                <div className='btn-count'>
                    {/* DECREMENT-BTN */}
                    <button
                        className='counter-btn'
                        onClick={() => updatePersonInfo("adult", "d") }
                        disabled={personCountInfo.adult <= 1}
                    >-</button>

                    {/* ADULT COUNT */}
                    <span>{personCountInfo.adult}</span>
                     
                     {/* INCREMENT BTN */}
                    <button className='counter-btn'
                        onClick={() => updatePersonInfo("adult", "i") }
                    >+</button>
                </div>

            </div>

            {/* CHILDRENS */}
            <div className='info'>
                <span>Children</span>

                <div className='btn-count'>
                     {/* DECREMENT-BTN */}
                    <button className='counter-btn'
                         onClick={() => updatePersonInfo("children", "d") }
                         disabled={personCountInfo.children <= 0}
                    >-</button>

                     {/* CHILDREN COUNT */}
                    <span>{personCountInfo.children}</span>

                      {/* INCREMENT BTN */}
                    <button className='counter-btn'
                        onClick={() => updatePersonInfo("children", "i") }
                    >+</button>
                </div>

            </div>

            {/* ROOMS */}
            <div className='info'>
                <span>Rooms</span>

                <div className='btn-count'>
                     {/* DECREMENT-BTN */}
                    <button className='counter-btn'
                         onClick={() => updatePersonInfo("room", "d") }
                         disabled={personCountInfo.room <= 1}
                    >-</button>
 
                     {/* ROOM COUNT */}
                    <span>{personCountInfo.room}</span>

                      {/* INCREMENT BTN */}
                    <button className='counter-btn'
                        onClick={() => updatePersonInfo("room", "i") }
                        disabled={personCountInfo.room >= 5}
                    >+</button>
                </div>

            </div>

            {/* DONE BUTTON */}
            <div>
                <button className='white-btn' onClick={()=> setPersonModal(false)}>Done</button>
            </div>
        </div>

    )
}
