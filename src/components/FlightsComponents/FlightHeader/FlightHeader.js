import React, { useContext, useState } from 'react'
import './FlightHeader.css'
import { FlightSearchBar } from './FlightSearchBar/FlightSearchBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { TravellerCountModal } from '../TravellerCountModal/TravellerCountModal'
import { TravellerDetailsContext } from '../TravellerDetailsContext/TravellerDetailsContext'

export const FlightHeader = () => {
  
    
   const {travellerCount} = useContext(TravellerDetailsContext);
    const [adultCount, setAdultCount] = useState(1);
    const [childCount ,setChildCount] = useState(0);
    const [showTravellerModal, setShowTravellerModal] = useState(false);

    
    return (
        <header className='flight-header parent-container'>
            <div className='flight-header-content child-container'>
                <h1>Compare and book flights with ease</h1>
                <p>Discover your next dream destination</p>

                <div className='user-input-div'>
                    {/* <input type="radio" name="trip" id="" /> <span>Round trip</span>
                    <input type="radio" name="trip" id="" /> <span>One way</span>
                    <input type="radio" name="trip" id="" /> <span>Multi-city</span>
                    <select name="" id="">
                        <option value="Economy">Economy</option>
                        <option value="Premium economy">Premium economy</option>
                        <option value="Business">Business</option>
                        <option value="First Class">First Class</option>
                    </select> */}

                    <div className='flight-traveller-count-container'>
                        <span className='flight-traveller-count-span'
                         onClick={()=> setShowTravellerModal(!showTravellerModal)}>
                            {travellerCount} Traveller <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                             
                             {/* FLIGHT TRAVELLER MODAL */}
                            {showTravellerModal &&  <TravellerCountModal 
                
                            setShowTravellerModal={setShowTravellerModal}
                            adultCount={adultCount} setAdultCount={setAdultCount} childCount={childCount}
                            setChildCount={setChildCount}/>}
                    </div>

                    
                </div>
                 
                 {/* FLIGHT SEARCH BAR */}
                <FlightSearchBar/>
            </div>
        </header>
    )
}
