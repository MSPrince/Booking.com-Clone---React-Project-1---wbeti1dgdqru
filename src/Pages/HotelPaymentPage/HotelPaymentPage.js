import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./hotelpaymentpage.css";
import axios from "axios";
import { BookingSuccessModal } from "../../components/BookingSuccessModal/BookingSuccessModal";

export const HotelPaymentPage = () => {
  const [isBookingSuccessful, setBookingSuccessModal] = useState(false);

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

  function convertDate(date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    let readableDate = date.toLocaleString("en-IN", options);
    return readableDate;
  }

  const [paymentFailMsg, setPaymentFailMsg] = useState(null);
  const userBearerToken = sessionStorage.getItem("userToken");

  const bookHotel = async (hotelBookingDetails) => {
    const config = {
      headers: {
        Authorization: `Bearer ${userBearerToken}`,
        projectID: "f104bi07c490",
      },
    };

    try {
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking",
        hotelBookingDetails,
        config
      );
      console.log(response);
      setBookingSuccessModal(true);
    } catch (error) {
      console.log("Error in booking hotel", error);
      setPaymentFailMsg(true);
    }
  };

  function handleHotelPayment(e) {
    e.preventDefault();
    setPaymentFailMsg(false);
    const hotelBookingDetails = {
      bookingType: "hotel",
      bookingDetails: {
        hotelId: state.hotelData._id,
        startDate: state.userData.date[0].startDate,
        endDate: state.userData.date[0].endDate,
      },
    };
    bookHotel(hotelBookingDetails);
  }

  const { state } = useLocation();
  console.log("hotel payment page state", state);

  return (
    <section className="hotel-payment-page parent-container">
      <div className="child-container hotel-payment-page-content">
        <h1 className="check-and-pay">Check and Pay</h1>

        <div className="hotel-final-details">
          <div>
            <h1>Hotel {state.hotelData.name}</h1>
            <p>{state.hotelData.location}</p>
            <p>Room Number: {state.roomValues.join(", ")}</p>
          </div>

          <div>
            <h3>Guest Details</h3>
            <div className="guest-list">
              <li>{state.userData.personCountInfo.adult} Adult</li>
              <li>{state.userData.personCountInfo.children} Children</li>
            </div>
          </div>

          <div>
            <h3>Check In & Check Out Date</h3>
            <p>
              {convertDate(state.userData.date[0].startDate)} to{" "}
              {convertDate(state.userData.date[0].endDate)}
            </p>
          </div>

          <div>
            <h2>Total &#8377; {state.totalAmmount.toLocaleString("en-IN")}</h2>
          </div>
        </div>

        {/* Payment Box */}
        <div className="flight-payment-container">
          <form action="" onSubmit={handleHotelPayment}>
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

              {paymentFailMsg && (
                <div>
                  <p className="error-message">Something Went Wrong</p>
                </div>
              )}

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
