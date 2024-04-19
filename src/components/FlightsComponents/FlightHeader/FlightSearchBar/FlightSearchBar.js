import React, { useEffect, useRef, useState } from 'react'
import './FlightSearchBar.css'
import { faArrowDownLong, faArrowRightArrowLeft, faArrowUpLong, faCalendar, faPlaneArrival, faPlaneDeparture, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { AirportDetails } from '../../../AirportDetails/AirportDetails';

export const FlightSearchBar = () => {

    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const [showSuggestionModal, setShowSuggestionModal] = useState(false); // show departure Suggestion Modal
    const [suggestionData, setSuggestionData] = useState(null)             // departure suggestion data ([]);

    const [showArrivalSuggestionModal, setArrivalSuggestionModal] = useState(false);
    const [arrivalSuggestionData, setArrivalSuggestionData] = useState(null);

    const [showDepartureX, setShowDepartureX] = useState(false);
    const [showArrivalX, setShowArrivalX] = useState(false);

    const [source, setSource] = useState('');   // source state -> for storing departure airport code to call the api (eg: BOM)
    const [destination, setDestination] = useState(''); // destination state -> for storing arrival airport code to call the api (eg: AMD)

    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');


    const debounceTimeout = useRef(null);


    const whereFromRef = useRef();
    const whereToRef = useRef();

    const airportDetails = AirportDetails();
    // console.log(airportDetails);



    const navigateTo = useNavigate()

    // My handleFlightSearch function is handled by throttling technique;
    function handleFlightSearch() {
       
        if (departure === '') {
            whereFromRef.current.focus(); // if departure is empty return
            return;
        } else if (arrival === '') {
            whereToRef.current.focus(); // if arrival is empty return
            return;
        }

        if(departure === arrival){
            alert("Source and destination can't be same"); // if dep or arr is same return
            return;
        }

        if(source === '' || destination === ''){
            alert("Select source or destination from suggestion list");
            return;
        }

        {
        // console.log("source", source)
        // console.log("destination", destination)

        // console.log("departure city", departureCity);
        // console.log("arrival city", arrivalCity);
        // console.log(departure, arrival, startDate);

        // navigating and passing states to flightList page (user collected data)
        // departure: source (eg: BOM)
        // arrival: destination (eg: AMD) -> to trigger api airport code
        // startDate, departureCity and arrivalCity
        } // comments

        navigateTo('/flights/flightslist', { state: { departure: source, arrival: destination, startDate, arrivalCity, departureCity } })
        
    }

    let isClicked = useRef(false);

    const throttling = (callback, delay)=>{
       
         return function (){
            if(!isClicked.current){
                
                callback();
                isClicked.current = true;
                
                setTimeout(()=>{
                    isClicked.current = false;
                }, delay)
            }
         }
    }

    const throttleFlightSearchButton = throttling(handleFlightSearch, 2000);

    function swapFlightSearch(e) {
        // IF BOTH ARE EMPTY THEN DON'T SWAP
        if (departure === '' && arrival === '') {
            return;
        }

        //  SWAP INPUT FIELD
        if(arrival !== ''){
            setShowDepartureX(true);
        }else{
            setShowDepartureX(false);
        }

        if(departure !== ''){
           setShowArrivalX(true);
        }
        else{
            setShowArrivalX(false);
        }
        let temp = departure;
        setDeparture(arrival);
        setArrival(temp);
       

        // SWAP SOURCE AND DESTINATION
        let temp2 = source;
        setSource(destination);
        setDestination(temp2);

        // SWAP CITIES
        let tempCity = departureCity;
        setDepartureCity(arrivalCity);
        setArrivalCity(tempCity);

        // CLOSE SUGGESTION MODAL OF DEPARTURE AND ARRIVAL
        setArrivalSuggestionModal(false);
        setShowSuggestionModal(false);


    }

    // On departure and arrival input change getSuggestionList will triggered after pause of 200ms (expensive function)
    function getSuggestionList(keyword){
        console.log("value", keyword);
        if(keyword == ''){
            return;
        }
        let filterSearch = airportDetails.filter((data) => {
            let code = data.IATA_code.toLowerCase();
            let airportName = data.airport_name.toLowerCase();
            let cityName = data.city_name.toLowerCase();
            let value =  keyword.toLowerCase();
            if (code.includes(value) || airportName.includes(value) || cityName.includes(value)) {
                return data
            }
        })

        return filterSearch;
    }

    function handleDepartureInput(e){
    setDeparture(e.target.value); 
    }

    // Handling Debounce for Departure Input using useEffect hook (debouncing getSuggestionList());
    useEffect(() => {
        if (departure !== '') {
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(() => {
                const suggestionList = getSuggestionList(departure);
                setSuggestionData(suggestionList);
                setShowSuggestionModal(true);
                setShowDepartureX(true);

            }, 200); // Adjusting the debounce delay of getSuggestionList for departure input
        } else {
            setShowSuggestionModal(false);
            setShowDepartureX(false);
        }
    }, [departure]);


    function handleArrivalInput(e){
        setArrival(e.target.value);
    }

    // Handling Debounce for Arrival Input using useEffect hook (debouncing getSuggestionList());
    useEffect(()=>{
      if(arrival !== ''){
          clearTimeout(debounceTimeout.current);
          debounceTimeout.current = setTimeout(()=>{
           const suggestionList = getSuggestionList(arrival);
           setArrivalSuggestionData(suggestionList);
           setArrivalSuggestionModal(true);
           setShowArrivalX(true);
          }, 200); // Adjusting the debounce delay of getSuggestionList for departure input
      }else{
        setArrivalSuggestionModal(false);
        setShowArrivalX(false);
      }
    }, [arrival])

    function suggestionClicked(e) {
        const selectedAirport = e.target.innerText;
        let airportCode = ''
        for (let i = 0; i < selectedAirport.length; i++) {
            let ch = selectedAirport.charAt(i);
            if (ch === ' ') {
                break;
            } else {
                airportCode = airportCode + ch;
            }
        }

        let cityName = '';

        for (let i = selectedAirport.length - 1; i >= 0; i--) {
            let ch = selectedAirport.charAt(i);
            if (ch === ",") {
                break;
            } else {
                cityName = ch + cityName;
            }
        }  

        console.log("airport code", airportCode);
        console.log("city name", cityName);

        //   setting state of aiport-code and city Name
        if(e.target.className === "arrival-suggestion-para"){
            setDestination(airportCode);
            setArrivalCity(cityName);
        }else{
            setSource(airportCode);
            setDepartureCity(cityName);
        }

       

    }

    function handleDepartureXMark() {
        setDeparture('');
        setShowDepartureX(false);
        setShowSuggestionModal(false);
        setSource('');
        setDepartureCity('');
        whereFromRef.current.focus();

    }

    function handleArrivalXMark() {
        setArrival('');
        setShowArrivalX(false);
        setArrivalSuggestionModal(false);
        setDestination('');
        setArrivalCity('');
        whereToRef.current.focus();
    }

    

    return (
        <div className='flight-search-bar'>
            <div className='flight-searchBar-container'>
                <div className='flight-searchItem'>

                    <div className='flight-departure-input-div'>
                        <FontAwesomeIcon icon={faPlaneDeparture} />
                         {/* DEPARTURE INPUT */}
                        <input type="text" placeholder='Where from?'
                            className='flight-input-bar' 
                            value={departure}
                            onChange={handleDepartureInput}                   
                            ref={whereFromRef} />

                        {showDepartureX && <FontAwesomeIcon icon={faXmark} className='flight-xmark'
                            onClick={handleDepartureXMark} />}
                            {/* DEPARTURE SUGGESTION MODAL */}
                        {showSuggestionModal && <div className='suggestion-modal box-shadow' >
                            {suggestionData.length > 0 && suggestionData.map((data, index) => (
                                <p key={index} className='suggestion-para'
                                 onClick={(e)=>{
                                    whereFromRef.current.value = e.target.innerText;
                                    suggestionClicked(e);
                                    
                                    setDeparture(e.target.innerText);
                                    setShowSuggestionModal(false);
                                 }} >
                                    {data.IATA_code} {data.airport_name}, {data.city_name}
                                </p>
                            ))}

                        </div>}
                    </div>


                </div>
                 {/* SWAP BUTTON */}
                <div className='flight-searchItem swap-flight-box' onClick={swapFlightSearch}>
                    <div className='flight-exchange-div'>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className='right-left-arrow' />
                        <FontAwesomeIcon icon={faArrowUpLong} className='up-down-arrow' />
                        <FontAwesomeIcon icon={faArrowDownLong} className='up-down-arrow' />
                    </div>
                </div>

                <div className='flight-searchItem'>
                    <div className='flight-landing-input-div'>
                        <FontAwesomeIcon icon={faPlaneArrival} />
                        {/* ARRIVAL INPUT */}
                        <input type="text" placeholder='Where to?' className='flight-input-bar'
                            value={arrival}
                            onChange={handleArrivalInput}
                            ref={whereToRef} />

                        {showArrivalX && <FontAwesomeIcon icon={faXmark} className='flight-xmark'
                            onClick={handleArrivalXMark} />}
                           {/* ARRIVAL SUGGESION MODAL */}
                           {showArrivalSuggestionModal && <div className='arrival-suggestion-modal box-shadow'>
                                {arrivalSuggestionData.length > 0 && arrivalSuggestionData.map((data, index)=>(
                                 <p key={index} className='arrival-suggestion-para'
                                 onClick={(e)=>{
                                 suggestionClicked(e);
                                 setArrival(e.target.innerText);
                                 setArrivalSuggestionModal(false);
                                 }}>
                                 {data.IATA_code} {data.airport_name}, {data.city_name}
                                 </p>
                                )) }
                            </div>}
                    </div>
                </div>
                 {/* FLIGHT DATE PICKER */}
                <div className='flight-searchItem' id='flight-date-div'>
                    <FontAwesomeIcon icon={faCalendar} />
                    <DatePicker
                        selected={startDate}
                        value={format(startDate, "dd/MM/yyyy")}
                        onChange={(date) => setStartDate(date)}
                        className='flight-calender-date'
                    />
                </div>
                {/* SEARCH BUTTON */}
                <button className='same-btn flight-search-btn' onClick={throttleFlightSearchButton}>Search</button>



            </div>
        </div>
    )
}
