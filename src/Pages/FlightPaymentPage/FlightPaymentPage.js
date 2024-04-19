import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./flightPaymentpage.css";
import { BookingSuccessModal } from "../../components/BookingSuccessModal/BookingSuccessModal";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FlightPaymentPage = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;

    if (regex.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleCardNumber = (e) => {
    const { name, value } = e.target;

    const digits = value.replace(/[^\d]/g, "");
    const formatCardNumber = (digits.match(/.{1,4}/g) || [])
      .join("-")
      .substr(0, 19);
    setFormData({ ...formData, [name]: formatCardNumber });
  };

  function handleExpiryDate(e) {
    const { name, value } = e.target;

    const digits = value.replace(/[^\d]/g, "");
    // Insert a "/" after the first 2 digits
    const formatExpiryDate = digits
      .replace(/(\d{2})(?=\d)/, "$1/")
      .substr(0, 5);
    setFormData({ ...formData, [name]: formatExpiryDate });
  }

  function handleCVC(e) {
    const { name, value } = e.target;

    if (isNaN(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  }

  function calculateTax(number) {
    return ((5 / 100) * number).toFixed(2);
  }

  const [totalCost, setTotalCost] = useState(null);
  const [baseCost, setBaseCost] = useState(null);
  const [taxAndCharges, setTaxAndCharges] = useState(null);
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const travellerCount = sessionStorage.getItem("flightTravellersCount");

  // TO SHOW THE TOTAL PRICE CALLING THE SELECTED FLIGHT API
  const getSelectedFlightData = async () => {
    const config = {
      headers: {
        projectID: "f104bi07c490",
      },
    };
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${state.flightId}`,
        config
      );
      console.log("selected flight data", response.data.data);

      let flightPrice = response.data.data.ticketPrice;
      setBaseCost(() => {
        const basePrice =
          flightPrice * parseInt(travellerCount) -
          calculateTax(flightPrice * parseInt(travellerCount));
        return basePrice;
      });

      setTaxAndCharges(() => {
        const charges = calculateTax(flightPrice * parseInt(travellerCount));
        return charges;
      });

      setTotalCost(flightPrice * parseInt(travellerCount));

      setShowPriceDetails(true);
    } catch (error) {
      console.log("selected flight api error", error);
    }
  };

  useEffect(() => {
    getSelectedFlightData();
  }, []);

  const [isBookingSuccessful, setBookingSuccessful] = useState(false);
  const userBearerToken = sessionStorage.getItem("userToken");
  const loggedInUserDetails = JSON.parse(
    sessionStorage.getItem("loginUserDetails")
  );
  const { state } = useLocation();
  console.log("payment page state", state);

  const bookFlightTicket = async (flightDetails) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userBearerToken}`,
        projectID: "f104bi07c490",
      },
    };

    try {
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking",
        flightDetails,
        config
      );
      console.log(response);
      setBookingSuccessful(true);
    } catch (error) {
      console.log(error);
    }
  };

  function handleFlightForm(e) {
    e.preventDefault();
    console.log("Pay button triggered");

    const flightDetails = {
      bookingType: "flight",
      userId: loggedInUserDetails._id,
      bookingDetails: {
        flightId: state.flightId,
        startDate: state.startDate,
      },
    };

    bookFlightTicket(flightDetails);
  }

  return (
    <section className="payment-page parent-container">
      <div className="child-container">
        <div className="flight-location-div">
          <div className="payment-traveller-date-div">
            <li>{travellerCount} Traveller</li>

            <li>
              {state.day} {state.startDate.getDate()}{" "}
              {state.startDate.toLocaleString("default", { month: "short" })}
            </li>
          </div>

          <div>
            <h1>
              {state.departureCity} to {state.arrivalCity}
            </h1>
          </div>
        </div>

        {showPriceDetails && (
          <div className="flight-cost-details-container">
            <h1>Check and pay</h1>
            <div className="flight-price-detials">
              <div>
                <b>Ticket ({travellerCount} Traveller)</b>
                <div className="base-tax-div">
                  <span>Flight Fare</span>
                  <span>INR {baseCost.toLocaleString("en-IN")}</span>
                </div>
                <div className="base-tax-div">
                  <span>Tax and charges</span>
                  <span>INR {taxAndCharges.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div>
                <div className="base-tax-div">
                  <h2>Total</h2>
                  <h2>INR {totalCost.toLocaleString("en-IN")}</h2>
                </div>
                <small>indudes taxes and charges</small>
              </div>

              <div>
                <p className="green-para">No hidden fees</p>
              </div>
            </div>
          </div>
        )}

        <div className="flight-payment-container">
          <form action="" onSubmit={handleFlightForm}>
            <div className="payment-method-box">
              <div>
                <h1>Your Payment</h1>
                <p>Simple, safe and secure</p>
              </div>

              <div>
                <p>How would you like to pay?</p>
                <div className="payment-cards-images-container">
                  <img
                    src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg"
                    alt="discover"
                  />
                  <img
                    src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/mc.svg"
                    alt="master-card"
                  />
                  <img
                    src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/jcb.svg"
                    alt="JCB"
                  />
                  <img
                    src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/visa.svg"
                    alt="VISA"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cardHolderName">Cardholder's Name</label>
                <input
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleInputChange}
                  placeholder="Name On Card"
                  required
                />
              </div>

              <div>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                  maxLength="19"
                  onChange={handleCardNumber}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  required
                />
              </div>

              <div id="expiry-cvc-box">
                <div>
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    pattern="\d{2}/\d{2}"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryDate}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc">CVC</label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    pattern="\d{3}"
                    value={formData.cvc}
                    onChange={handleCVC}
                    maxLength="3"
                    placeholder="XXX"
                    required
                  />
                </div>
              </div>

              <div>
                <input type="submit" value="Pay Now" className="blue-btn" />
              </div>
            </div>
          </form>
        </div>
      </div>
      {isBookingSuccessful && <BookingSuccessModal />}
    </section>
  );
};
