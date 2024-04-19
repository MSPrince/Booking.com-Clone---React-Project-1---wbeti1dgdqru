import React, { useEffect, useRef, useState } from 'react'
import './FlightBooking.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const FlightBooking = () => {


    const { state } = useLocation();

    console.log(state);

    const navigateTo = useNavigate();

    const loginUserDetails = JSON.parse(sessionStorage.getItem('loginUserDetails'));


    const [formData, setFormData] = useState({
        travellerEmail: loginUserDetails.email,
        travellerNumber: '',
        cardHolderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
    })

    const emailRef = useRef();
    const mobileRef = useRef();

    const [errorMessage, setErrorMessage] = useState(null);
    const [genderError, setGenderError] = useState(null);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage(null);


    }

    const handlePhoneNumber = (e) => {

        const { value, name } = e.target;
        const numericValue = value.replace(/[^0-9]/g, '');


        setFormData({ ...formData, [name]: numericValue });

    }


    function handleNextBtn(e) {

        e.preventDefault();

        // CHECK IF USER ENTERED VALID EMAIL
        const userEmail = formData.travellerEmail;

        if (userEmail.includes('.com') || userEmail.includes('.co') || userEmail.includes('.in') || userEmail.includes('.org') || userEmail.includes('.net') || userEmail.includes('.gov') || userEmail.includes('.edu')) {
            console.log("Valid email")

        }
        else {
            console.log('error in gmail')
            setErrorMessage('Enter a valid Email');
            emailRef.current.focus();
            return
        }

        //  CHECK IF GENDER SELECTED OR NOT OF ALL TRAVELLERS
        let index = 1;
        for (let traveller of travellersDetailBox) {
            if (traveller.gender === 'Select your gender') {
                setGenderError(`Please Select Gender of Traveller ${index}`);
                return;
            }
            index++;
        }

        // IF ALL THE DETAILS FILLED CORRECTLY NAVIGATE TO PAYMENT PAGE
        navigateTo('/payment', { state: { ...state } });


    }

    // TRAVELLER INPUT CHANGE FIRST NAME AND LAST NAME
    function handleTravellerInputChange(e) {
        const { value, name, id } = e.target;
        // console.log(id, name, value);

        const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?\/\\|`~0-9]/;
        console.log(regex.test(value));

        if (regex.test(value)) {
            return;
        }

        setGenderError(null);
      
        // [{name: ""}, {}, {}]

        setTravellersDetailBox((oldDetails) => {

            const updatedDetail = [...oldDetails];
            updatedDetail[parseInt(id)][name] = value;
            return updatedDetail;
        })

    }

    const travellerCount = sessionStorage.getItem("flightTravellersCount");
    const [travellersDetailBox, setTravellersDetailBox] = useState(null)

//    CREATING ARRAY (arraylength === travellerCount) for travellers details
    useEffect(() => {
        setTravellersDetailBox(() => {
            const numberOfTravellers = Array.from({ length: parseInt(travellerCount) }, (_, index) => ({
                firstName: '',
                lastName: '',
                gender: 'Select your gender',
            }));

            return numberOfTravellers;
        });

    }, [])


    return (
        <section className='flight-booking-page parent-container'>
            <div className='child-container'>

                <div className='flight-travellers-contact-details-container'>

                    <div className='where-to-where-from'>
                        <div className='traveller-count-date-div'>
                            <li>{travellerCount} travellers</li>
                            <li>{state.day} {state.startDate.getDate()} {state.startDate.toLocaleString('default', { month: 'short' })}</li>
                        </div>
                        <h1>{state.departureCity} to {state.arrivalCity}</h1>
                    </div>

                </div> 

                <form onSubmit={handleNextBtn}>

                    <div className='Who-flying-container'>
                        <h2>Who's flying?</h2>
                          {/* CONTACT DETAILS BOX */}
                        <div className='flight-contact-details-container'>
                            <h3>Contact details</h3>

                            <div className='flight-contact-details-input-div'>
                                <p>Contact email</p>
                                <input type="email" name='travellerEmail' value={formData.travellerEmail} onChange={handleInputChange} placeholder='Email' ref={emailRef} required />
                                {errorMessage ? <small className='error-message'>{errorMessage}</small> : <small>We'll send your flight confirmation here</small>}
                            </div>

                            <div className='flight-contact-details-input-div'>
                                <p>Phone number</p>
                                <input type="text" name='travellerNumber' value={formData.travellerNumber} onChange={handlePhoneNumber} maxLength='10' pattern='[0-9]{10}' placeholder='Enter 10-digit Phone Number' ref={mobileRef} required />
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <small>Get free SMS updates about your flight</small>
                                </div>

                            </div>
                        </div>

                    </div>

                     {/* TRAVELLERS DETAILS BOX */}
                    {travellersDetailBox && travellersDetailBox.length > 0 && travellersDetailBox.map((item, index) => (

                        <div className='flight-travellers-name-container' key={index}>
                            <h3>Traveller {index + 1}</h3>
                             {/* first name input */}
                            <div className='travellers-info'>
                                <div className='first-last-name-div'>
                                    <p>First name</p>
                                    <input type="text" name='firstName' id={index} value={item.firstName} onChange={handleTravellerInputChange} required />
                                    <small>Enter exactly what's written on this traveller's travel document</small>
                                </div>
                               {/* last name input */}
                                <div className='first-last-name-div'>
                                    <p>Last name</p>
                                    <input type="text" name='lastName' id={index} value={item.lastName} onChange={handleTravellerInputChange} required />
                                    <small>Enter exactly what's written on this traveller's travel document</small>
                                </div>
                            </div>
                              {/* gender selection */}
                            <div className='flight-traveller-gender-div'>
                                <p>Gender specified on your travel document </p>
                                <select name="gender" id={index} onChange={handleTravellerInputChange} required>
                                    <option value="Select your gender">Select your gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>

                                </select>
                                <small>We're currently required by airlines and providers to ask for this information</small>
                            </div>

                        </div>

                    ))}

                    {genderError && <p className='error-message gender-error-msg'>{genderError}</p>}

                    {/* NEXT BUTTON */}
                    <button className='same-btn flight-next-btn'>Next</button>

                </form>




            </div>


        </section>
    )
}
