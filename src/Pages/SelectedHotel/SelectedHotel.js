import React, { useContext, useEffect, useState } from "react";
import "./selectedhotel.css";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../components/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareParking } from "@fortawesome/free-solid-svg-icons";

export const SelectedHotel = () => {
  const [hotelData, setHotelData] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const { hotelId } = useParams(); //particular hotel id
  console.log("hotelId", hotelId);

  const navigateTo = useNavigate();

  const location = useLocation();
  console.log("selected-hotel location", location);

  const getSelectedHotelData = async () => {
    const config = {
      headers: {
        projectID: "f104bi07c490",
      },
    };

    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`,
        config
      );
      console.log(response.data.data);
      setHotelData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSelectedHotelData();
  }, []);

  function handleReserveButton() {
    navigateTo("/hotels/rooms", {
      state: { userData: location.state, hotelData, hotelId },
    });
  }
  return (
    <div className="selected-hotel-page parent-container">
      <div className="selected-hotel-container child-container">
        {hotelData ? (
          <div className="selected-hotel-content">
            <div className="hotel-name-reservebtn-div">
              <h1>{hotelData.name}</h1>
              <button
                className="same-btn reserve-btn"
                onClick={handleReserveButton}
              >
                Reserve
              </button>
            </div>

            <div>
              <p>{hotelData.location}</p>
            </div>

            <p className="taxi-offer-para">
              Book a stay over &#8377; 5,484 at this property and get free
              airport taxi
            </p>

            <div className="selected-hotel-img-div">
              {hotelData.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="hotel-image"
                  className="selected-hotel-images"
                />
              ))}
            </div>

            <div className="selected-hotel-details">
              <div className="hotel-discription">
                {!isLoggedIn && (
                  <p>
                    You're eligible for a Genius discount at Hotel{" "}
                    {hotelData.name}! To save this property, all you have to do
                    is <NavLink to="/login">sign in</NavLink>
                  </p>
                )}

                <p>
                  Hotel {hotelData.name} features air-conditioned rooms with
                  flat-screen TV which is located in {hotelData.location}. This
                  hotel offers room service and a 24-hour front-desk. There is
                  free private parking and the property features paid airport
                  shuttle service.
                </p>

                <p>
                  All rooms at the hotel are fitted with a seating area. The
                  private bathroom is fitted with a shower, free toiletries and
                  slippers. At Hotel {hotelData.name} the room have bed linen
                  and towels
                </p>
              </div>

              <div className="property-highlight-box">
                <h3>Property highlights</h3>

                <div>
                  {hotelData.amenities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </div>

                <p>
                  <FontAwesomeIcon icon={faSquareParking} /> Free private
                  parking available
                </p>

                <button
                  className="same-btn"
                  id="reserve-now-btn"
                  onClick={handleReserveButton}
                >
                  Reserve Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
};
