import React, { useState } from 'react'
import './flightmain.css'

export const FlightMain = () => {

    const [intClicked, setIntClicked] = useState(true);
    const [domesticClicked, setDomesticClicked] = useState(false);



    return (
        <main className='flight-main-container parent-container'>
            <div className='flight-main-content child-container'>

                <section className='popular-flights'>
                    <div className='popular-flight-heading'>
                       
                        <h2>Popular flights near you</h2>
                        <p>Find deals on domestic and international flights</p>
                    
                    </div>

                    <div className='popular-flight-buttons'>
                        <button className={`inter-domestic-btn ${intClicked ? 'add-border' : ''}`}
                            onClick={() => {
                                if (domesticClicked) {
                                    setDomesticClicked(false);
                                }
                                setIntClicked(true)
                            }}

                        >International</button>

                        <button className={`inter-domestic-btn ${domesticClicked ? 'add-border' : ''}`}
                            onClick={() => {
                                if (intClicked) {
                                    setIntClicked(false);
                                }
                                setDomesticClicked(true)
                            }}
                        >Domestic</button>

                    </div>

                    {intClicked && <div className='international-domestic-content static-content'>
                        <article className='int-dom-item'>
                            <img src="https://q-xx.bstatic.com/xdata/images/city/square210/674773.jpg?k=f65fb36a6b12a3f09a07232ef7946deb46871c0d5a308d3e16ff127d61233f41&o=" alt="Male city"  />
                            <h4>Bangalore to Male City</h4>
                        </article>
                        <article className='int-dom-item'>
                            <img src="https://cdn.britannica.com/15/189715-050-4310222B/Dubai-United-Arab-Emirates-Burj-Khalifa-top.jpg" alt="Dubai"  />
                            <h4>Bangalore to Dubai</h4>
                        </article>
                        <article className='int-dom-item'>
                            <img src="https://cdn.britannica.com/57/20057-004-404C9F85/Grand-Palace-Bangkok-Thailand.jpg" alt="Bangkok"  />
                            <h4>Bangalore to Bangkok</h4>
                        </article>
                        <article className='int-dom-item'>
                            <img src="https://q-xx.bstatic.com/xdata/images/city/square210/688060.jpg?k=57065d3be37fb33083964a32334c077cf3cbc52eac00202e887d8c20636514e6&o=" alt="Kuta"  />
                            <h4>Bangalore to Kuta</h4>
                        </article>
                    </div>}

                    {domesticClicked && <div className='international-domestic-content static-content'>
                        <article className='int-dom-item'>
                            <img src="https://q-xx.bstatic.com/xdata/images/city/square210/684511.jpg?k=4ee759f0ea5c88e018f4e67af90dedaae2e34313d84b228b841bb2c8f3741875&o=" alt="Ahmedabad"  />
                            <h4>Bangalore to Ahmedabad</h4>
                        </article>
                        <article className='int-dom-item'>
                            <img src="https://q-xx.bstatic.com/xdata/images/city/square210/684655.jpg?k=2afb45c7a46dedbc5b5b360599dbbb7a7165ac823b22dd66d7602ea4c49de1c4&o=" alt="Jaipur"  />
                            <h4>Bangalore to Jaipur</h4>
                        </article>
                        <article className='int-dom-item'>
                            <img src="https://q-xx.bstatic.com/xdata/images/city/square210/971345.jpg?k=9bf85dfa10a224e2855ca2f8ca3fcd96916a962d87cdfcc48d6d57c09bef3c65&o=" alt="Mumbai"  />
                            <h4>Bangalore to Mumbai</h4>
                        </article>
                        <article className='int-dom-item'>
                            <img src="https://q-xx.bstatic.com/xdata/images/city/square210/684652.jpg?k=5055a718205497d78d7d80b05c6cfbd59b79af5998231e50c23832e103087691&o=" alt="Hyderabad"  />
                            <h4>Bangalore to Hyderabad</h4>
                        </article>
                    </div>}
                </section>


             <section className='flight-trending-cities'>
               <div className='flight-trending-cities-heading'>
                <h2>Trending cities</h2>
                <p>Book flights to a destination popular with travellers from India</p>
                </div>
                <div className='trending-city-imgDiv static-content'>
                  <article>
                    <img src="https://q-xx.bstatic.com/xdata/images/city/square210/684764.jpg?k=6c3c9e920a39ca4f9eddcdfaa916999ea5d2765844610dd59349f4271f7596b3&o=" alt="New Delhi" />
                    <h4>New Delhi, India</h4>
                  </article>
                  <article>
                    <img src="https://q-xx.bstatic.com/xdata/images/city/square210/684757.jpg?k=5cd52ccbba6806c371689dab0da9678a5c1f4dcef697ea976a000f5e53ac4f18&o=" alt="Panaji" />
                    <h4>Panaji, India</h4>
                  </article>
                  <article>
                    <img src="https://q-xx.bstatic.com/xdata/images/city/square210/971345.jpg?k=9bf85dfa10a224e2855ca2f8ca3fcd96916a962d87cdfcc48d6d57c09bef3c65&o=" alt="Mumbai" />
                    <h4>Mumbai, India</h4>
                  </article>
                  <article>
                    <img src="https://q-xx.bstatic.com/xdata/images/city/square210/684533.jpg?k=efaef4796fa555481ddabf686c3fc66433b50ba69c936d6f702b1125b1d06748&o=" alt="Banglore" />
                    <h4>Banglore, India</h4>
                  </article>
                </div>
             </section>

         




            </div>
        </main>
    )
}
