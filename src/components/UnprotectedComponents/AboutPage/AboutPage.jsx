// Import 3rd Party Libraries
import React from 'react';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';
import Footer from '../../AccessoryComponents/Footer/Footer';
import '/AboutPage_Image.jpg';

// Import Material UI and CSS
import './AboutPage.css';

function AboutPage() {
  return (
    <div>
      <NavBar />
      <h1 className="AboutPageHeader">About</h1>
      <div className="AboutPageMainDiv">
        {/* Div for written contents */}
        <div className="AboutPageWrittenSection">
          {/* Div for Founders */}
          <div>
            <p>
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b>MyMedVita </b>
              </span>
              was founded by a physician, health economist, and an engineer.
              With nearly{' '}
              <span style={{ color: '#782CF6', textWeight: 'bold' }}>
                <b> 100 years of combine experience </b>
              </span>
              , they teamed up to help empower consumers navigate their
              healthcare choices by knowing the prices upfront.
            </p>
          </div>
        </div>
        {/* Div for= Image */}
        <div className="AboutPageImageDiv">
          <img className="AboutPageMainImage" src="AboutPage_Image.jpg" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
