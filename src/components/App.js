import "../styles/App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { createContext, useState } from "react";

import { Navbar } from "./Navbar/Navbar";
import { ComingSoon } from "../Pages/ComingSoon/ComingSoon";
import { Footer } from "./Footer/Footer";
import {Flights} from "../Pages/Flights/Flights"
import { Home } from "../Pages/Home/Home";
import { Register } from "../Pages/Register/Register";
import { Login } from "../Pages/Login/Login";
import { Profile } from "../Pages/Profile/Profile";
import { HotelsList } from "../Pages/HotelsList/HotelsList";
import { SelectedHotel } from "../Pages/SelectedHotel/SelectedHotel";
import { SelectRooms } from "../Pages/SelectRoom/SelectRooms";
import { HotelBookingAuth } from "./AuthNavigator/HotelBookingAuth";
import { MyTrips } from "../Pages/MyTrips/MyTrips";
import { FlightPaymentPage } from "../Pages/FlightPaymentPage/FlightPaymentPage";
import { HotelPaymentPage } from "../Pages/HotelPaymentPage/HotelPaymentPage";
import { AuthUser } from "./AuthNavigator/AuthUser";
import Error404 from "./Error404/Error404";

export const AuthContext = createContext();

function App() {

  let isUserLoggedIn =  sessionStorage.getItem('userToken') ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn);

  return(
    <BrowserRouter>
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/flights/*" element={<Flights />}/>
      <Route path="/carrentals" element={<ComingSoon />}/>
      <Route path="/attractions" element={<ComingSoon/>}/>
      <Route path="/airporttaxis" element={<ComingSoon />}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<AuthUser> <Profile/> </AuthUser>}/>
      <Route path='/hotelslist' element={<HotelsList />}/>
      <Route path='/hotels/:hotelId' element={<SelectedHotel />}/>
      <Route path='/hotels/rooms' element={<HotelBookingAuth><SelectRooms/></HotelBookingAuth>}/>
      <Route path='/mytrips' element={<AuthUser><MyTrips /> </AuthUser>}/>
      <Route path='/payment' element={<FlightPaymentPage/> }/>
      <Route path='/hotelpayment' element={<HotelPaymentPage/> }/>
      <Route path='*' element={<Error404/> }/>
     </Routes>
     <Footer/>
     </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App;
