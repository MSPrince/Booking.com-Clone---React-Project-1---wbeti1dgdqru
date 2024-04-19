import React, { useContext, useEffect, useState } from "react";
import "./selectedflight.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../components/App";
import { TravellerDetailsContext } from "../../components/FlightsComponents/TravellerDetailsContext/TravellerDetailsContext";
import { Footer } from "../../components/Footer/Footer";

export const SelectedFlight = () => {
  const location = useLocation();

  const flightIdPathname = location.pathname;
  const departure = location.state.departure;
  const arrival = location.state.arrival;
  const startDate = location.state.startDate;
  const day = location.state.day;
  const departureCity = location.state.departureCity;
  const arrivalCity = location.state.arrivalCity;

  // console.log("selectedFlight location object", location);
  // console.log(departure, arrival, startDate);

  const navigateTo = useNavigate();

  const { flightId } = useParams(); // getting flight id from url

  const [selectedFlight, setSelectedFlight] = useState(null);

  const [seatNo, setSeatNo] = useState("No seat selected");
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [totalSeats, setTotalSeats] = useState(0);
  const [reservedSeats, setReservedSeats] = useState([]);
  // console.log("in open reserved Seats", reservedSeats);

  const travellerCount = sessionStorage.getItem("flightTravellersCount");

  // CREATING ARRAY (arraylength === available seats) and inserting element starting from 1 to available seats
  const allSeats = Array.from({ length: totalSeats }, (_, index) => index + 1);

  // GET SINGLE FLIGHT DATA
  const getSelectedFlightData = async () => {
    const config = {
      headers: {
        projectID: "f104bi07c490",
      },
    };
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`,
        config
      );
      // console.log(response.data.data);
      setSelectedFlight(response.data.data);
      setTotalSeats(response.data.data.availableSeats);
    } catch (error) {
      console.log("selected flight api error", error);
    }
  };

  // BY DEFAULT DISPLAY THE FETCED DATA ON INITIAL RENDER
  useEffect(() => {
    getSelectedFlightData();
  }, []);

  // WHEN SEAT MODAL IS OPEN OR IS CLOSED RUN USE-EFFECT TO SHOW ALREADY SELECTED SEATS
  useEffect(() => {
    const flightSeats = document.getElementsByClassName("flight-seats");
    if (flightSeats.length > 0) {
      for (let seats of flightSeats) {
        for (let num of reservedSeats) {
          if (seats.innerText === num) {
            seats.classList.add("backgroundColor-seat");
          }
        }
      }
    }
  }, [showSeatModal]);

  function calculateTax(number) {
    return ((5 / 100) * number).toFixed(2);
  }

  // HANDLE FLIGHT BOOK BUTTON
  function handleFlightBookBtn() {
    if (seatNo === "No seat selected") {
      alert("Please Select Seat");
      return;
    }
    let seatSelectedForAllTraveller = seatNo.split(",");
    console.log(seatSelectedForAllTraveller.length);
    console.log("type of travellerCount", typeof travellerCount);
    if (seatSelectedForAllTraveller.length != travellerCount) {
      // travellerCount is string so to do implicit coercion '!='
      alert("Please select seat for all travellers");
      return;
    }
    navigateTo("/flights/flightbooking", {
      state: {
        flightId,
        flightIdPathname,
        departure,
        arrival,
        startDate,
        departureCity,
        arrivalCity,
        day,
      },
    });
  }

  // HANDLE SELECTION OF SEATS
  function handleSelectedSeat(e) {
    // GETTING ALL THE ELEMENT HAVING CLASS 'backgroundColor-seat'
    const isAlreadySelected = document.getElementsByClassName(
      "backgroundColor-seat"
    );
    // console.log("inside selection", isAlreadySelected);

    //  IF CLICKED AGAIN ON SAME SEAT THAN REMOVE SELECTION
    let isClickedAgain = false;
    if (isAlreadySelected.length > 0) {
      for (let seat of isAlreadySelected) {
        if (seat.innerText === e.target.innerText) {
          e.target.classList.remove("backgroundColor-seat");
          isClickedAgain = true;
        }
      }

      if (isClickedAgain) {
        setReservedSeats((oldSeats) => {
          return oldSeats.filter((item) => item !== e.target.innerText);
        });
      }

      if (isAlreadySelected.length >= travellerCount) {
        // if seat selected for all traveller than return
        // console.log("reserved Seats", reservedSeats);
        return;
      }
    }

    // SEAT SELECTION -> ADD CLASS  'backgroundColor-seat'
    if (!isClickedAgain) {
      e.target.classList.add("backgroundColor-seat");
      reservedSeats.push(e.target.innerText);
    }

    // DISPLAYING SEAT NUMBERS ON UI
    if (isAlreadySelected.length > 0) {
      let selectedSeats = [];
      for (let num of isAlreadySelected) {
        selectedSeats.push(num.innerText);
      }
      setSeatNo(() => {
        return selectedSeats.join(",");
      });
    } else {
      setSeatNo("No seat selected");
      setReservedSeats([]);
    }

    // console.log("reserved Seats", reservedSeats);
  }

  return (
    <section className="selected-flight-page parent-container">
      <div className="child-container">
        {selectedFlight ? (
          <div className="selected-flight-content">
            {/* TRAVELLER COUNT AND DATE */}
            <div className="summary-header-div">
              <div className="traveller-count">
                <FontAwesomeIcon icon={faCircle} className="circle-icon" />
                <li>{travellerCount} Traveller</li>
                <FontAwesomeIcon icon={faCircle} className="circle-icon" />
                <li>
                  {day} {startDate.getDate()}{" "}
                  {startDate.toLocaleString("default", { month: "short" })}
                </li>
              </div>
              <div className="summary-heading">
                <h1>
                  {departureCity} to {arrivalCity}
                </h1>
                <button className="same-btn" onClick={handleFlightBookBtn}>
                  Book Ticket
                </button>
              </div>
            </div>

            <div className="summary-main">
              {/* SELECT SEAT BOX */}
              <h4>Select your seat</h4>

              <section className="select-seat-container">
                <div
                  className="select-seat-box"
                  onClick={() => setShowSeatModal(!showSeatModal)}
                >
                  <div className="seat-details-box">
                    <h5>
                      {departureCity} - {arrivalCity}
                    </h5>
                    <p>{selectedFlight.duration} hour</p>
                    <p>Seat number: {seatNo}</p>
                  </div>

                  <div>
                    <FontAwesomeIcon
                      icon={faCircleChevronDown}
                      className="dropdownArrow"
                    />
                  </div>
                </div>
                {/* SEAT SELECTION MODAL */}
                {showSeatModal && (
                  <div className="flight-seat-modal">
                    {allSeats.length > 0 &&
                      allSeats.map((seatNumber, index) => (
                        <div
                          className="flight-seats"
                          key={index}
                          onClick={handleSelectedSeat}
                        >
                          {seatNumber}
                        </div>
                      ))}
                  </div>
                )}
              </section>

              {/* TICKET SUMMARY */}
              <h4>Ticket Summary</h4>
              <section className="ticket-summary-box">
                <h5>
                  {departureCity} - {arrivalCity}
                </h5>
                <p>
                  Flight Departure Time: <b>{selectedFlight.departureTime}</b>
                </p>
                <p>
                  Flight Arrival Time: <b>{selectedFlight.arrivalTime}</b>
                </p>
                <p>Duration: {selectedFlight.duration} hour</p>
                <p>Available Seats: {selectedFlight.availableSeats}</p>
                <p>
                  Amenities:{" "}
                  {selectedFlight.amenities.map((facility, index) => (
                    <span key={index}>{facility} </span>
                  ))}
                </p>
                <p>Flight-ID: {selectedFlight.flightID}</p>
              </section>

              {/* FARE SUMMARY */}
              <h4>Fare Summary</h4>
              <section className="fare-summary-box">
                <div>
                  <h5>Ticket({travellerCount} traveller)</h5>
                  <p>
                    Flight Fare: INR{" "}
                    {parseInt(selectedFlight.ticketPrice) *
                      parseInt(travellerCount) -
                      calculateTax(
                        parseInt(selectedFlight.ticketPrice) *
                          parseInt(travellerCount)
                      )}
                  </p>
                  <p>
                    Taxes and Charges: INR{" "}
                    {calculateTax(
                      parseInt(selectedFlight.ticketPrice) *
                        parseInt(travellerCount)
                    )}
                  </p>
                </div>

                <div>
                  <h1>
                    Total: INR{" "}
                    {(
                      parseInt(selectedFlight.ticketPrice) *
                      parseInt(travellerCount)
                    ).toLocaleString("en-IN")}
                  </h1>
                  <p>Includes taxes and charges</p>
                </div>

                <div>
                  <span className="green-para">
                    <FontAwesomeIcon icon={faCheck} className="check-icon" /> No
                    Hidden Fees
                  </span>
                </div>

                <div>
                  <button className="same-btn" onClick={handleFlightBookBtn}>
                    Book Ticket
                  </button>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
};
