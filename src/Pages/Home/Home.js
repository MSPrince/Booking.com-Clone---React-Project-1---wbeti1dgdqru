import React from 'react'
import './home.css'

import { OfferCard } from '../../components/OfferCard/OfferCard'
import { BrowseByProperty } from '../../components/BrowseByProperty/BrowseByProperty'
import { Header } from '../../components/Header/Header'
import { ExploreIndia } from '../../components/ExploreIndia/ExploreIndia'

export const Home = () => {
  return (
    <>
      <Header />
      <main className='home-page parent-container'>
        <div className='homepage-content child-container'>

          <div className='trending-destination'>
            <h2>Trending destinations</h2>
            <p>Most popular choices for traveller from India</p>
          </div>

          <div className='cards-container'>

            <div className="big-card-container">
              <div className='big-card-item'>
                <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWdyYXxlbnwwfHwwfHx8MA%3D%3D" alt="Agra" />
                <h2 className='big-item-title'>Agra</h2>
              </div>
              <div className='big-card-item'>
                <img src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVuZ2FsdXJ1fGVufDB8fDB8fHww" alt="Banglore" />
                <h2 className='big-item-title'>Banglore </h2>
              </div>
            </div>

            <div className='small-card-container'>
              <div className='small-card-item'>
                <img src="https://cf2.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="Mumbai" />
                <h2 className='small-item-title'>Mumbai</h2>
              </div>
              <div className='small-card-item'>
                <img src="https://cf2.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=" alt="Chennai" />
                <h2 className='small-item-title'>Chennai </h2>
              </div>
              <div className='small-card-item'>
                <img src="https://cf2.bstatic.com/xdata/images/city/600x600/684571.jpg?k=2166dfd3192f12497a35d57434f14f2f9175eca9e2698b04eeb827064c3c9d4d&o=" alt="Kolkata" />
                <h2 className='small-item-title'>Kolkata </h2>
              </div>
            </div>
          </div>

          <OfferCard />
          <BrowseByProperty />
          <ExploreIndia />

        </div>
      </main>
    </>
  )
}
