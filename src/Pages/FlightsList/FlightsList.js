import React, { useContext, useEffect, useState } from "react";
import "./flightslist.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  faPersonWalkingLuggage,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { TravellerDetailsContext } from "../../components/FlightsComponents/TravellerDetailsContext/TravellerDetailsContext";

export const FlightsList = () => {
  const location = useLocation();
  const navigateTo = useNavigate();

  // SETTING TRAVELLER COUNT SESSION STORAGE WHEN CLICKING ON SEE FLIGHTS
  const { travellerCount } = useContext(TravellerDetailsContext);
  // console.log("traveller Count", travellerCount)

  const totalTraveller = sessionStorage.getItem("flightTravellersCount");

  const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;
  const departureCity = location.state.departureCity;
  const arrivalCity = location.state.arrivalCity;
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysOfWeek[startDate.getDay()]; // getDay() will return between 0-6

  const [flights, setFlights] = useState(null);

  const getFlightsList = async () => {
    const config = {
      headers: {
        projectID: "f104bi07c490",
      },
    };

    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${day}&search={"source":"${departure}","destination":"${arrival}"}`,
        config
      );
      console.log("best flight", response.data.data.flights);
      setFlights(response.data.data.flights);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFlightsList();
    setBestClicked(true);
    setFastestClicked(false);
    setCheapestClicked(false);
  }, [departure, arrival, startDate]);

  // FILTER BUTTON STATES (BEST, CHEAPEST, FASTEST)
  const [bestClicked, setBestClicked] = useState(true);
  const [cheapestClicked, setCheapestClicked] = useState(false);
  const [fastestClicked, setFastestClicked] = useState(false);

  function handleBest() {
    setFlights(null);
    setTimeout(() => {
      getFlightsList();
    }, 2000);

    setBestClicked(true);
    setCheapestClicked(false);
    setFastestClicked(false);
  }

  // SORT BY CHEAPEST PRICE (LOWEST TICKET PRICE FIRST)
  function handleCheapest() {
    const cheapestFlight = [...flights];
    cheapestFlight.sort((a, b) => a.ticketPrice - b.ticketPrice); // cheapest first

    setFlights(null);
    console.log("cheapestflight", cheapestFlight);
    setTimeout(() => {
      setFlights(cheapestFlight);
    }, 2000);
    setCheapestClicked(true);
    setBestClicked(false);
    setFastestClicked(false);
  }

  // SORT BY LESS DURATION (FASTEST FLIGHT FIRST)
  function handleFastest() {
    const fastestFlight = [...flights];
    fastestFlight.sort((a, b) => a.duration - b.duration);

    setFlights(null);
    console.log("fastest flight", fastestFlight);
    setTimeout(() => {
      setFlights(fastestFlight);
    }, 2000);

    setFastestClicked(true);
    setBestClicked(false);
    setCheapestClicked(false);
  }

  function handleSeeFlightBtn(flight) {
    sessionStorage.setItem("flightTravellersCount", travellerCount);
    navigateTo(`/flights/${flight._id}`, {
      state: {
        departure: flight.source,
        arrival: flight.destination,
        startDate,
        departureCity,
        arrivalCity,
        day,
      },
    });
  }

  return (
    <section className="flights-list-page parent-container">
      <div className="flights-list-container child-container">
        <div className="flights-list-content">
          <div className="flight-sorting-btn-container">
            <button
              className={`flight-sorting-btn ${
                bestClicked ? "add-bottom-border" : ""
              }`}
              onClick={handleBest}
            >
              Best
            </button>
            <button
              className={`flight-sorting-btn ${
                cheapestClicked ? "add-bottom-border" : ""
              }`}
              onClick={handleCheapest}
            >
              Cheapest
            </button>
            <button
              className={`flight-sorting-btn ${
                fastestClicked ? "add-bottom-border" : ""
              }`}
              onClick={handleFastest}
            >
              Fastest
            </button>
          </div>

          <div className="flight-results-div">
            {/* DYNAMIC FLIGHTS DATA */}
            {flights ? (
              flights.length > 0 ? (
                flights.map((flight, index) => (
                  <article className="flight-cards" key={index}>
                    <div className="flight-timing-div">
                      {/* where from div */}
                      <div className="left-div">
                        <div>
                          <FontAwesomeIcon icon={faPlaneDeparture} />
                        </div>
                        <div>
                          <p>
                            <b>{flight.departureTime} </b>
                          </p>
                          <span>
                            {flight.source} {startDate.getDate()}{" "}
                            {startDate.toLocaleString("default", {
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                      {/* flight duration div */}
                      <div className="center-div">
                        <p>{flight.duration}h</p>
                        <span>---------</span>
                        <p>
                          {flight.stops === 0
                            ? "Direct"
                            : flight.stops + " stop"}
                        </p>
                      </div>
                      {/* where to div */}
                      <div className="right-div">
                        <div>
                          <FontAwesomeIcon icon={faPlaneArrival} />
                        </div>
                        <div>
                          <p>
                            <b>{flight.arrivalTime}</b>
                          </p>
                          <span>
                            {flight.destination} {startDate.getDate()}{" "}
                            {startDate.toLocaleString("default", {
                              month: "short",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Price div */}
                    <div className="flight-price-div">
                      <div className="cabin-bag-div">
                        <FontAwesomeIcon
                          icon={faSuitcaseRolling}
                          className="bag-icon"
                        />
                        <FontAwesomeIcon
                          icon={faPersonWalkingLuggage}
                          className="bag-icon"
                        />
                        <p>Included cabin bag, checked bag</p>
                      </div>
                      <div className="flight-price-content">
                        <h2>
                          INR {flight.ticketPrice.toLocaleString("en-IN")}
                        </h2>
                        <p>
                          INR{" "}
                          {(
                            parseInt(flight.ticketPrice) *
                            parseInt(travellerCount)
                          ).toLocaleString("en-IN")}{" "}
                          Total price for all travellers{" "}
                        </p>
                      </div>
                      {/* See flight button */}
                      <button
                        className="white-btn"
                        onClick={() => {
                          handleSeeFlightBtn(flight);
                        }}
                      >
                        See flight
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="flight-not-found">
                  We don't have any flights matching your search on our site.
                  Try changing some details.
                </p>
              )
            ) : (
              <div className="loading-modal">
                <img
                  src="https://assets-v2.lottiefiles.com/a/ac5056c0-116d-11ee-827b-cb344459ad99/D7zi0V8We2.gif"
                  alt="loading"
                  className="loading-gif"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
