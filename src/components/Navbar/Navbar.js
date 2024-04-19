import React, { useContext, useState } from 'react'
import './navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faPlane, faCar, faTaxi, faMapPin, faUser } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../Header/Header';
import { AuthContext } from '../App';
import { LiaBedSolid } from "react-icons/lia";
import { PiAirplaneInFlight } from "react-icons/pi";
import { LiaCarSolid } from "react-icons/lia";
import { MdOutlineAttractions } from "react-icons/md";
import { PiTaxi } from "react-icons/pi";
import { HeadingTopIcons } from './HeadingTopIcons';

export const Navbar = () => {

  const [showProfileModal, setShowProfileModal] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const userName = JSON.parse(sessionStorage.getItem("loginUserDetails"));

  const navigate = useNavigate();

  function toggleProfileModal() {
    setShowProfileModal(!showProfileModal);
  }

  function handleLogout() {

    sessionStorage.clear();
    setShowProfileModal(false);
    setIsLoggedIn(false);
    navigate('/login');
  }
  return (
    <nav id="navbar" className="parent-container">
      <div className="child-container nav-container">
        <div id="reg-div">
          <span id="booking-logo">
            <NavLink to="/">
              <h2 className="css-text-mask">Booking.com</h2>
            </NavLink>
          </span>

          {/* IS LOGGED IN TRUE SHOW PROFILE ICON */}
          {isLoggedIn ? (
            <div className="profile-icon-container">
              <HeadingTopIcons />

              <FontAwesomeIcon
                id="user-icon"
                icon={faUser}
                onClick={toggleProfileModal}
              />
              <span>{userName.name}</span>

              {/* PROFILE MODAL */}
              {showProfileModal && (
                <div className="profile-modal">
                  <button
                    className="white-btn"
                    onClick={() => {
                      setShowProfileModal(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>

                  <button
                    className="white-btn"
                    onClick={() => {
                      setShowProfileModal(false);
                      navigate("/mytrips");
                    }}
                  >
                    My Trips
                  </button>

                  <button className="white-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // IF ISLOGGED IN IS FALSE SHOW REGISTER AND LOGIN BUTTONS DIV
            <div id="btn-container">
              <HeadingTopIcons />
              <button className="reg-btn" onClick={() => navigate("/register")}>
                Register
              </button>
              <button className="reg-btn" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>
          )}
        </div>

        {/* NAVIGATION LINKS */}
        <nav id="navigation-Links">
          <ul id="links-container">
            {/* <li><NavLink to="/"><FontAwesomeIcon icon={faBed} /> Stays</NavLink></li> */}
            <li>
              <NavLink to="/">
                <LiaBedSolid className="navLinkIcon" /> Stays
              </NavLink>
            </li>
            <li>
              <NavLink to="/flights">
                <PiAirplaneInFlight className="navLinkIcon" /> Flights
              </NavLink>
            </li>
            <li>
              <NavLink to="/carrentals">
                <LiaCarSolid className="navLinkIcon" /> Car Rentals
              </NavLink>
            </li>
            <li>
              <NavLink to="/attractions">
                <MdOutlineAttractions className="navLinkIcon" /> Attractions
              </NavLink>
            </li>
            <li>
              <NavLink to="/airporttaxis">
                <PiTaxi className="navLinkIcon" /> Airport taxis
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* <Header/> */}
      </div>
    </nav>
  );
}
