import React from 'react'
import './OfferCard.css'
import { useNavigate } from 'react-router-dom'

export const OfferCard = () => {

    const navigateTo = useNavigate();
    return (
        <section className='offerCard-container'>

            <div className='offer-heading'>
            <h2>Offers</h2>
            <p>Promotions, deals and special offers for you</p>
            </div>
            <div className='all-offers'>
            <div className='offer-card'>
                <article className='offer-card-details'>
                    <h4>Fly away to your dream holiday</h4>
                    <p>Get inspired, compare and book flights with more flexibility</p>
                    <button className='same-btn' id='flight-btn' onClick={() => navigateTo('/flights')}>Search for flights</button>
                </article>

                <div className='offer-img-div'>
                    <img src="https://r-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.png?k=6bb1bf3c13db4a7ba3c22a2d1f1051f793c525a78104703b4dec3eb12101f545&o=" width={150} height={120} alt="" />
                </div>
            </div>

            <div className='offer-card'>
                <article className='offer-card-details'>
                    <h4>Take your longest holiday yet</h4>
                    <p>Browse properties offering long-term stays, many at reduced monthly rates.</p>
                    <button className='same-btn' id='flight-btn' onClick={() => navigateTo('/')}>Find a stay</button>
                </article>

                <div className='offer-img-div'>
                    <img src="https://q-xx.bstatic.com/xdata/images/xphoto/500x500/220031205.jpeg?k=bf9841e8ba89dfdf92e02d45e45dc89fcca2d981b7c74ad57d3ecf6ba64ba1c2&o=" width='100%' height='100%' alt="" />
                </div>
            </div>

            </div>
        </section>
    )
}
