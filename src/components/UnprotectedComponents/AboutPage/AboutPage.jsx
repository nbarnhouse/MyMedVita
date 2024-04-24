// Import 3rd Party Libraries
import React from 'react';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';
import './AboutPage.css';

function AboutPage() {
  return (
    <div>
      <NavBar />
      <div className="AboutPageMainDiv">
        <div>
          <h1>About</h1>
          <img
            className="AboutPageMainImage"
            src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/10/image4-Cropped.jpg"
          />
        </div>
        {/* Div for written contents */}
        <div className="AboutPageWrittenSection">
          {/* Div for Founders */}
          <div>
            <h2>Founders</h2>
            <p>
              <b>MyMedVita</b> was founded by a medical doctor, health
              economist, and an engineer. With over
              <b> 100 years of combine experience</b> in the healthcare
              industry, they teamed up to empower consumers to navigate
              healthcare through price transparency.
            </p>
          </div>
          {/* Div for Mission */}
          <div>
            <h2>Mission</h2>
            <p>
              <b>MyMedVita</b> allows any insured or uninsured consumer to
              <b> search, sort, and select</b> their healthcare by price,
              provider, and distance so they know before they go.
            </p>
          </div>
          {/* Div for Vision */}
          <div>
            <h2>Vision</h2>
            <p>
              <b>MyMedVita</b> aspires to be the United States
              <b> most trusted and independent</b> healthcare marketplace where
              millions of consumers depend on its transparent information to
              empower their healthcare decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
