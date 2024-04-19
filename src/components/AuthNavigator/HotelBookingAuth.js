import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../App';

export const HotelBookingAuth = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext);
    const location = useLocation();
    console.log("In hotel booking auth file", location);
  
    return isLoggedIn ? children : <Navigate to='/login' state={{...location.state, prevPath: location.pathname}}/>;
}
