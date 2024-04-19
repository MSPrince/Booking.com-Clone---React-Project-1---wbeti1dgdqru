import React, { useRef, useState } from 'react'
import './HotelsListSearchBox.css'
import { format, max } from 'date-fns';
import { DateRange } from 'react-date-range';

export const HotelsListSearchBox = ({destination, setDestination, date, setDate, personCountInfo, setPersonCountInfo, fetchHotelsData, setHotelHeading}) => {

  const[showCalender, setShowCalender] = useState(false);
  const destinationRef = useRef();
 
  return (
    <div className='hotelslist-searchbox'>

            <div className='searchbox-items'>
              <h3>Search Hotels</h3>
            </div>

            <div className='searchbox-items'>
              <p>Desitnation</p>
              <input type="text" value={destination} ref={destinationRef} placeholder='Where are you going?' onChange={(e) => setDestination(e.target.value)} />
            </div>

            <div className='searchbox-items searchBox-date-div'>
              <p>Check-in Check-out date</p>
              <span className='hotelslist-date-span'
              onClick={()=> setShowCalender(!showCalender)}>
                {format(date[0].startDate, "MM/dd/yyyy") + " to " + format(date[0].endDate, "MM/dd/yyyy")}</span>

                {showCalender && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='searchBox-calender'
                        />}
            </div>

            <div className='searchbox-items'>
              <p>Persons and Rooms</p>

              <div className='person-items'>
                <p>Adult</p>
                <input type="number" value={personCountInfo.adult}
                  onChange={(e) => setPersonCountInfo({ ...personCountInfo, adult: e.target.value })}
                  min="1" max="9" />
              </div>
              <div className='person-items'>
                <p>Children</p>
                <input type="number" value={personCountInfo.children}
                  onChange={(e) => setPersonCountInfo({ ...personCountInfo, children: e.target.value })}
                  min="0" max="9" />
              </div>
              <div className='person-items'>
                <p>Rooms</p>
                <input type="number" value={personCountInfo.room}
                  onChange={(e) => {
                    if(e.target.value >= 6){
                      return;
                    }
                    setPersonCountInfo({ ...personCountInfo, room: e.target.value })
                  }}
                  min="1" max="5" />
              </div>
            </div>

            <div className='searchbox-items'>
              <button className='hotels-list-SearchBtn' onClick={()=>{
               if(destination === ''){
                destinationRef.current.focus();
                console.log('inside focus condition')
                return;
               }
               
               
                fetchHotelsData(destination)
                setHotelHeading(destination);
              }}>Search</button>
            </div>




          </div>
  )
}
