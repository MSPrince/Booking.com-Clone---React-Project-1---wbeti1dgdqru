import React, { useContext } from 'react'
import { AuthContext } from '../App'
import { Navigate, useLocation } from 'react-router-dom'


export const FlightBookingAuth = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext)
    
    const location = useLocation();
  return isLoggedIn ? children : <Navigate to='/login' state={{...location.state, prevPath: location.state.flightIdPathname }}/>
}
