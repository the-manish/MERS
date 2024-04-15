import React from "react";
// import urlLogo from '../../assets/logo.svg';
import "./Footer.css";

const Footer = () => {
  return (
    <div className="url__footer section__padding">


      <div className="url__footer-links">
        <div className="url__footer-links_logo">
          {/* <img src={urlLogo} alt="url_logo" /> */}
          <p>
            Crechterwoord K12 182 DK Alknjkcb, <br /> All Rights Reserved
          </p>
        </div>
        <div className="url__footer-links_div">
          <h4>Features</h4>
          <p>Solution Therapy</p>
          <p>Discussion</p>
          <p>Mind Refreshment</p>
          
        </div>
        <div className="url__footer-links_div">
          <h4>Resources</h4>
          <p>Blog</p>
          <p>Developers</p>
          <p>Support</p>
        </div>
        <div className="url__footer-links_div">
          <h4>Company</h4>
          <p>About</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>
      </div>

      <div className="url__footer-copyright">
        <p>@2024 Mind mentor. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
