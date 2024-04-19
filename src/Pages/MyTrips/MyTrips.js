import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./MyTrips.css";
import { NavLink } from "react-router-dom";

export const MyTrips = () => {
  const userBearerToken = sessionStorage.getItem("userToken");

  const [myTripsData, setMyTripsData] = useState(null);

  const getMyTrips = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userBearerToken}`,
        projectID: "f104bi07c490",
      },
    };

    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking/",
        config
      );
      console.log("my trips response", response.data.data);
      const tripsDetails = [...response.data.data];
      tripsDetails.reverse();
      setMyTripsData(tripsDetails);
    } catch (error) {
      console.log("error fetching my trip", error);
    }
  };

  function formatDate(date) {
    const inputDate = new Date(date);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formatedDate = inputDate.toLocaleString("en-IN", options);
    return formatedDate;
  }

  useEffect(() => {
    getMyTrips();
  }, []);
  return (
    <div className="parent-container">
      <div className="child-container">
        <div className="my-trip-container">
          <h1 className="heading-mytrips">My Trips</h1>

          {myTripsData ? (
            myTripsData.length > 0 ? (
              myTripsData.map((trip, index) => (
                <article key={index} className="my-trips-card">
                  <div className="booking-type-date">
                    <p>Booking Type: {trip.booking_type}</p>
                    <p>Booked on: {formatDate(trip.created_at)}</p>
                  </div>

                  {trip.booking_type === "hotel" ? (
                    <div>
                      <h2>{trip.hotel.name}</h2>
                      <p>{trip.hotel.location}</p>
                    </div>
                  ) : (
                    <div className="error-message">
                      Unable to fetch flight Details. Please try again later
                    </div>
                  )}

                  <div>
                    <p>
                      Booking Status:{" "}
                      <span className="green-para">{trip.status}</span>
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div>
                <h2>No Trips Found</h2>
                <NavLink to={"/"}>Start Booking</NavLink>
              </div>
            )
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </div>
  );
};
