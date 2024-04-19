import { Link } from "react-router-dom";
import "./Footer.css"
import React from 'react'
import videoFile from "../../video/video.mp4"

export const Footer = () => {
  return (
    <footer className="parent-container footer">
      <div className="footer-bar">
        <video
          controls
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "200px" }}
          className="video-element"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="footer-content child-container">
        <p>Copyright © 2024 Booking.com. All rights reserved.</p>
        <p>
          Booking.com is part of Booking Holdings Inc., the world leader in
          online travel and related services.
        </p>
        <p>
          <Link to="https://msprince-portfolio.netlify.app/">@M.S.Prince</Link>
        </p>
        <div className="logos-container">
          <img
            src="https://r-cf.bstatic.com/static/img/tfl/group_logos/logo_booking/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0.png"
            alt="Booking.com logo"
            height={26}
            width={91}
          />

          <img
            src="https://q-cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png"
            alt="priceline.com logo"
            height={26}
            width={91}
          />

          <img
            src="https://r-cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png"
            alt="kayak logo"
            height={26}
            width={91}
          />

          <img
            src="https://q-cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png"
            alt="agoda logo"
            height={26}
            width={91}
          />

          <img
            src="https://r-cf.bstatic.com/static/img/tfl/group_logos/logo_rentalcars/6bc5ec89d870111592a378bbe7a2086f0b01abc4.png"
            alt="rentalcars.com logo"
            height={26}
            width={91}
          />

          <img
            src="https://r-cf.bstatic.com/static/img/tfl/group_logos/logo_opentable/a4b50503eda6c15773d6e61c238230eb42fb050d.png"
            alt="opentable logo"
            height={26}
            width={91}
          />
        </div>
      </div>
    </footer>
  );
}
