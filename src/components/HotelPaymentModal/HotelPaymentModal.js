import React, { useState } from "react";
import "./hotelpaymentmodal.css";
import axios from "axios";

export const HotelPaymentModal = ({
  setHotelPaymentModal,
  userData,
  hotelData,
  roomValues,
  totalAmmount,
  setBookingSuccessModal,
}) => {
  console.log("userData", userData);
  console.log("hotelData", hotelData);
  console.log("roomValues", roomValues);
  console.log("totalAmmount", totalAmmount);

  const userBearerToken = sessionStorage.getItem("userToken");
  const [paymentFailMsg, setPaymentFailMsg] = useState(null);

  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

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
      setHotelPaymentModal(false);
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
        hotelId: hotelData._id,
        startDate: userData.date[0].startDate,
        endDate: userData.date[0].endDate,
      },
    };
    bookHotel(hotelBookingDetails);
  }

  function convertDate(date) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    let readableDate = date.toLocaleString("en-IN", options);
    return readableDate;
  }

  const handleCardDetails = (e) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;

    if (regex.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="hotel-payment-modal parent-container">
      <div className="hotel-payment-box">
        <div className="hotel-payment-content">
          <div className="hotel-final-details">
            <div>
              <h4>Hotel {hotelData.name}</h4>
              <p>{hotelData.location}</p>
              <p>Room Number: {roomValues.join(", ")}</p>
            </div>

            <div>
              <h4>Guest Details</h4>
              <div className="guest-list">
                <li>{userData.personCountInfo.adult} Adult</li>
                <li>{userData.personCountInfo.children} Children</li>
              </div>
            </div>

            <div>
              <h4>Check In & Check Out Date</h4>
              <p>
                {convertDate(userData.date[0].startDate)} to{" "}
                {convertDate(userData.date[0].endDate)}
              </p>
            </div>

            <div>
              <h5>Total &#8377; {totalAmmount.toLocaleString("en-IN")}</h5>
            </div>
          </div>

          <button
            className="x-button"
            onClick={() => setHotelPaymentModal(false)}
          >
            x
          </button>

          <div className="div-1">
            <h2>Your Payment</h2>
            <p>simple, safe and secure</p>
          </div>

          <div className="div-2">
            <p>How would you like to pay?</p>
            <div className="atm-img-container">
              <img
                src="https://t-ec.bstatic.com/static/img/payments/payment_icons_redesign/discover.svg"
                alt="discover-card"
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

          <form
            action=""
            className="hotel-payment-form"
            onSubmit={handleHotelPayment}
          >
            <div>
              <label htmlFor="payment-holder-name">Card Holder's Name</label>
              <input
                type="text"
                name="payment-holder-name"
                id="payment-holder-name"
                value={formData.cardHolderName}
                onChange={(e) => setFormData(e.target.value)}
                placeholder="Name on Card"
                required
              />
            </div>

            <div>
              <label htmlFor="payment-card-number">Card Number</label>
              <input
                type="text"
                id="payment-card-number"
                name="cardNumber"
                value={formData.cardNumber}
                pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                maxLength="19"
                onChange={handleCardDetails}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                required
              />
            </div>

            <section>
              <div>
                <label htmlFor="expiry-num">Expiry Number</label>
                <input
                  type="text"
                  id="expiry-num"
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
                <label htmlFor="hpay-cvc">CVC</label>
                <input
                  type="text"
                  id="hpay-cvc"
                  name="cvc"
                  pattern="\d{3}"
                  value={formData.cvc}
                  onChange={handleCVC}
                  maxLength="3"
                  placeholder="XXX"
                  required
                />
              </div>
            </section>

            {paymentFailMsg && (
              <div>
                <p className="error-message">Something Went Wrong</p>
              </div>
            )}

            <div>
              <button className="blue-btn">Pay Now</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
