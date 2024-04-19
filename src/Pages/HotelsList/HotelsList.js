import React, { useEffect, useState } from "react";
import "./hotelslist.css";
import { useLocation, useNavigate } from "react-router-dom";
import { format, max } from "date-fns";
import { HotelsListSearchBox } from "../../components/HotelsListComponents/HotelsListSearchBox/HotelsListSearchBox";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const HotelsList = () => {
  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [personCountInfo, setPersonCountInfo] = useState(
    location.state.personCountInfo
  );

  const [hotelsData, setHotelsData] = useState(null);

  const [hotelHeading, setHotelHeading] = useState(destination);

  const [hightestClicked, setHighestClicked] = useState(false);
  const [lowestClicked, setLowestClicked] = useState(false);
  const [ratingClicked, setRatingClicked] = useState(false);

  const navigateTo = useNavigate();

  //FETCH HOTELS LIST OF PARTICULAR LOCAION
  const fetchHotelsData = async (location) => {
    const config = {
      headers: {
        projectID: "f104bi07c490",
      },
    };
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${location}"}`,
        config
      );
      console.log("Hotels List", response.data.data.hotels);
      setHotelsData(response.data.data.hotels);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchHotelsData(destination);
    setHighestClicked(false);
    setLowestClicked(false);
    setRatingClicked(false);
  }, []);

  // SORTY-BY-PRICE FUNCTION IF HIGHEST 'true' SORT 'high-to-low' ELSE 'low-to-high'
  function sortByPrice(highest = true) {
    if (highest) {
      if (hightestClicked) {
        return; // IF HIGHEST ALREADY SELECTED CLICKED AGAIN RETURN
      }
      setLowestClicked(false);
      setHighestClicked(true);
    } else {
      if (lowestClicked) {
        return; // IF LOWEST ALREADY SELECTED AND CLICKED AGAIN RETURN
      }
      setHighestClicked(false);
      setLowestClicked(true);
    }

    setRatingClicked(false);

    const hotelsSortedByPrice = [...hotelsData];

    if (highest) {
      hotelsSortedByPrice.sort((a, b) => b.rooms[0].price - a.rooms[0].price); // highest first
    } else {
      hotelsSortedByPrice.sort((a, b) => a.rooms[0].price - b.rooms[0].price); // lowest first
    }

    console.log("Sort by price hotel data", hotelsSortedByPrice);
    setHotelsData(null);
    setTimeout(() => {
      setHotelsData(hotelsSortedByPrice);
    }, 500);
  } // sort-by-price function ends

  // SORT-BY-TOP-RATING FUNCTION
  function handleRatings() {
    if (ratingClicked) {
      return; //IF RATING ALREADY SELECTED AND CLICKED AGAIN RETURN
    }
    setLowestClicked(false);
    setHighestClicked(false);
    setRatingClicked(true);

    const highestRatingHotels = [...hotelsData];
    highestRatingHotels.sort((a, b) => b.rating - a.rating); // sorting by top rated

    console.log("Top Rated", highestRatingHotels);
    setHotelsData(null);
    setTimeout(() => {
      setHotelsData(highestRatingHotels);
    }, 500);
  } // TOP-RATING function ends

  function getRatingRemarks(rating) {
    if (rating >= 5) {
      return "Excellent";
    } else if (rating >= 4) {
      return "Very Good";
    } else if (rating >= 3) {
      return "Good";
    } else if (rating < 3) {
      return "Poor";
    }
  }

  return (
    <section className="hotels-list-page parent-container">
      <div className="hotels-list-container child-container">
        <div className="hotels-list-content">
          {/* HOTELS LIST SEARCH BOX COMPONENT */}
          <HotelsListSearchBox
            destination={destination}
            setDestination={setDestination}
            date={date}
            setDate={setDate}
            personCountInfo={personCountInfo}
            setPersonCountInfo={setPersonCountInfo}
            fetchHotelsData={fetchHotelsData}
            setHotelHeading={setHotelHeading}
          />

          <div className="hotels-list-div">
            {hotelsData && hotelsData.length > 0 && <h1>Hotels List</h1>}

            {hotelsData && hotelsData.length > 0 && (
              <div className="hotelList-button-container">
                <button
                  className={
                    lowestClicked ? "sorting-btn-clicked" : "hotel-sorting-btn"
                  }
                  onClick={() => {
                    sortByPrice(false);
                  }}
                >
                  Lowest Price
                </button>
                <button
                  className={
                    hightestClicked
                      ? "sorting-btn-clicked"
                      : "hotel-sorting-btn"
                  }
                  onClick={sortByPrice}
                >
                  Highest Price
                </button>
                <button
                  className={
                    ratingClicked ? "sorting-btn-clicked" : "hotel-sorting-btn"
                  }
                  onClick={handleRatings}
                >
                  Top Rated
                </button>
              </div>
            )}

            {hotelsData ? (
              hotelsData.length > 0 ? (
                hotelsData.map((hotel) => (
                  <article className="hotel-list-cards" key={hotel._id}>
                    {/* HOTEL IMAGE */}
                    <div className="hotels-list-img-div">
                      <img src={hotel.images[0]} alt="hotel image" />
                    </div>

                    <div className="details-price-div">
                      {/* HOTELS DETAILS */}
                      <div className="hotel-list-details-div">
                        <h2>{hotel.name}</h2>
                        <p>{hotel.location}</p>
                        <span className="airport-taxi">Free airport taxi</span>
                        <p className="bed-detail">{hotel.rooms[0].bedDetail}</p>
                        <ul className="amenities-list">
                          {hotel.amenities.map((facility, index) => (
                            <li key={index}>{facility}</li>
                          ))}
                        </ul>
                        <p className="green-para">Free Cancellation</p>
                        <p className="green-para">
                          {hotel.rooms[0].cancellationPolicy}
                        </p>
                      </div>

                      {/* HOTEL RATING, PRICE AND SEE AVAILABILITY BUTTON*/}
                      <div className="ratings-price-div">
                        <div className="hotels-rating">
                          <p>{getRatingRemarks(hotel.rating)}</p>
                          <p className="rating-para">{hotel.rating}</p>
                        </div>
                        <div className="hotels-price">
                          <h2>
                            &#8377;{" "}
                            {hotel.rooms[0].price.toLocaleString("en-IN")}
                          </h2>
                          <p>include Taxes and fees</p>
                          <button
                            onClick={() => {
                              navigateTo(`/hotels/${hotel._id}`, {
                                state: { destination, date, personCountInfo },
                              });
                            }}
                          >
                            See Availability
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <h1>Try different Search</h1>
              )
            ) : (
              <>
                <div className="loading-comp"></div>
                <div className="hotel-loading">
                  <img
                    src="https://media.tenor.com/JBgYqrobdxsAAAAi/loading.gif"
                    alt="loading"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
