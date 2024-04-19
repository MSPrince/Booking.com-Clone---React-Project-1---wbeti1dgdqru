import React from 'react'
import './browsebyproperty.css';

export const BrowseByProperty = () => {
  return (
    <section className='browse-property-container'>
        
        <h2>Browse by property type</h2>
        <div className='browse-property-content'>
            <div>
                <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" alt="hotel" />
                <h4>Hotel</h4>
            </div>

            <div>
                <img src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=" alt="apartments"  />
                <h4>Apartments</h4>
            </div>

            <div>
                <img src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=" alt="resorts"  />
                <h4>Resorts</h4>
            </div>

            <div>
                <img src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=" alt="villas" />
                <h4>Villas</h4>
            </div>
        </div>
        
        </section>
  )
}
