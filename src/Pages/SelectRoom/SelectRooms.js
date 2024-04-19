import React, { useState } from 'react'
import './selectroom.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { HotelPaymentModal } from '../../components/HotelPaymentModal/HotelPaymentModal'
import { BookingSuccessModal } from '../../components/BookingSuccessModal/BookingSuccessModal'


export const SelectRooms = () => {

    const location = useLocation()
    const navigateTo = useNavigate();
    console.log("select room page location", location);

    const hotelData = location.state.hotelData;
    const userData = location.state.userData;
    console.log("rooms", userData.personCountInfo.room);
    console.log(typeof userData.personCountInfo.room);
    

    const [roomValues, setRoomValues] = useState(Array(parseInt(userData.personCountInfo.room)).fill(''));
    const [errorMsg, setErrorMsg] = useState(false);
    const [totalAmmount, setTotalAmmount] = useState(false);
    const [hotelPaymentModal, setHotelPaymentModal] = useState(false);
    const [bookingSuccessModal, setBookingSuccessModal] = useState(false);


    const handleInputChange = (index, value) => {
        // Update the state with the new value
        const updatedValues = [...roomValues];
        updatedValues[index] = value;
        setRoomValues(updatedValues);
        setErrorMsg(false)
        setTotalAmmount(false);
    };

    function totalPrice(){

        // check for empty fields of room number
       for(let room of roomValues){
        let RoomNum = parseInt(room);
        if(room === ''){
            setErrorMsg('choose room number!');
            return;
        }
        else if(RoomNum > hotelData.rooms.length || RoomNum < 1){
            setErrorMsg('Incorrect room number!');
            return;
        }
       }
      
    //    check for same room selected
       let roomNum = [...roomValues];
       roomNum.sort();
       for(let i = 1; i < roomNum.length; i++){
            if(roomNum[i-1] === roomNum[i]){
                 setErrorMsg('choose different rooms');
                 return;
            }

       }

    //    calculating total price
       let totalSum = 0;
       for(let rNum of roomValues){
          totalSum = totalSum + hotelData.rooms[rNum-1].price;
       }

       setTotalAmmount(totalSum);
       
       console.log("still running")
    }


    

    return (
        <div className='parent-container'>
            <div className='child-container select-room-content'>
              
              <div className='room-inputBox-container'>
              <div className='select-room-input-box'>
                 <h2>Select Room</h2>
                 {roomValues.map((room, index)=>(
                    <div key={index} >
                        <label htmlFor={index+1}>Room Number</label>
                        <input type="number" id={index+1} name={index+1} className='room-input-bar'
                        min="1"
                        max={hotelData.rooms.length}
                        value={room}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    </div>
                 ))}

                 {errorMsg && <span className='error-message'>{errorMsg}</span>}
                 {totalAmmount && <span className='total-ammount'>&#8377; {totalAmmount.toLocaleString('en-IN')}</span>
}
                 <button className='white-btn' onClick={totalPrice}>Get Total Price</button>

                {totalAmmount && <button className='white-btn'
                onClick={()=> navigateTo('/hotelpayment', {state : {userData, hotelData, roomValues, totalAmmount}}) }>Proceed to Pay</button>}
                {/* onClick={()=> setHotelPaymentModal(true)} */}
              </div>
              </div>

                <div className='room-details'>
                    <h1>Rooms in Hotel {hotelData.name}</h1>

                    <div className='hotel-room-card-container'>

                        {
                            hotelData.rooms.map((room, index) => (
                                <article key={index} className='hotel-room-card'>
                                    <h3>Room Number {index + 1}</h3>
                                    <p>Room Type: {room.roomType}</p>
                                    <p>Bed details: {room.bedDetail}</p>
                                    <p>Room Size: {room.roomSize}</p>
                                    <h4>&#8377; {room.price.toLocaleString('en-IN')}</h4>
                                </article>
                            ))
                        }

                    </div>
                </div>


            </div>

            {hotelPaymentModal && 
            <HotelPaymentModal setHotelPaymentModal={setHotelPaymentModal}
            userData={userData} hotelData={hotelData} 
            roomValues={roomValues} totalAmmount={totalAmmount}
            setBookingSuccessModal={setBookingSuccessModal} />}

            {bookingSuccessModal && <BookingSuccessModal/>}
        </div>
    )
}
