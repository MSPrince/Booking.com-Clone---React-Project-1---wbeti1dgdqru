import React from 'react'
import './Information.css';

export const Information = () => {
    return (
        <section className='information-section parent-container '>
            <div className='information-container child-container' >
             
               <div className='information-content static-content'>

                <div className='info-item'>
                 <img src="https://t-cf.bstatic.com/design-assets/assets/v3.99.1/illustrations-traveller/MagnifyingGlassUsp.png" alt="Search img"/>
                 <div>
                    <h3>Search a huge selection</h3>
                    <p>Easily compare flights, airlines and prices - all in one place</p>
                 </div>
                </div>

                <div className='info-item'>
                 <img src="https://t-cf.bstatic.com/design-assets/assets/v3.99.1/illustrations-traveller/MoneyUsp.png" alt="Coins img"/>
                 <div>
                    <h3>Pay no hidden fees</h3>
                    <p>Get a clear price breakdown, every step of the way</p>
                 </div>
                </div>

                <div className='info-item'>
                 <img src="https://t-cf.bstatic.com/design-assets/assets/v3.99.1/illustrations-traveller/TicketsUsp.png" alt="Ticket img"/>
                 <div>
                    <h3>Get more flexibility</h3>
                    <p>Change your travel dates with the Flexible ticket option*</p>
                 </div>
                </div>
                


                </div>

            </div>

        </section>
    )
}
