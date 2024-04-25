// Import 3rd Party Libraries
import React from 'react';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';
import './AboutPage.css';
import '/AboutPage_Image.jpg';

function AboutPage() {
  return (
    <div>
      <NavBar />
      <div className="AboutPageMainDiv">
        <div>
          <h1 className="AboutPageHeader">About</h1>
          <img className="AboutPageMainImage" src="AboutPage_Image.jpg" />
        </div>
        {/* Div for written contents */}
        <div className="AboutPageWrittenSection">
          {/* Div for Founders */}
          <div>
            <h2>Founders</h2>
            <p>
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b>MyMedVita </b>
              </span>
              was founded by a medical doctor, health economist, and an
              engineer. With over
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b> 100 years of combine experience </b>
              </span>
              in the healthcare industry, they teamed up to empower consumers to
              navigate healthcare through price transparency.
            </p>
          </div>
          {/* Div for Mission */}
          <div>
            <h2>Mission</h2>
            <p>
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b>MyMedVita </b>
              </span>
              allows any insured or uninsured consumer to
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b> search, sort, and select </b>
              </span>
              their healthcare by price, provider, and distance so they know
              before they go.
            </p>
          </div>
          {/* Div for Vision */}
          <div>
            <h2>Vision</h2>
            <p>
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b>MyMedVita </b>
              </span>
              aspires to be the United States
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b> most trusted and independent </b>
              </span>
              healthcare marketplace where millions of consumers depend on its
              transparent information to empower their healthcare decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
