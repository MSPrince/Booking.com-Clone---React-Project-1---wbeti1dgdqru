import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../App';

export const AuthUser = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to='/login' />
}


