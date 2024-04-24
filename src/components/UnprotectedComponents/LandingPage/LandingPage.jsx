// Import 3rd Party Libraries
import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import doctorImage from './images/multipleDoctors.avif';

// Import Material UI
import { Button } from '@mui/material';

// Import Custom CSS
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <div className="landing-content-container">
        <div className="landing-left-container">
          <h1 className="landing-header">MyMedVita</h1>
          <p className="landing-paragraph">
            Your Compass for Healthcare Prices
          </p>
          <p className="landing-paragraph">Shop. Locate. Review. Contact</p>
          <div className="main-button-container">
            <Button
              component={RouterLink}
              to="/marketplace"
              variant="outlined"
              sx={{
                '&:hover': { backgroundColor: 'white', color: '#782cf6' },
                backgroundColor: '#782cf6',
                color: 'white',
              }}
              size="large"
            >
              Shop
            </Button>
            <Button
              component={RouterLink}
              to="/features"
              variant="outlined"
              size="large"
              sx={{
                '&:hover': { backgroundColor: 'white', color: '#782cf6' },
                backgroundColor: '#782cf6',
                color: 'white',
                margin: '10px 10px',
              }}
            >
              View Features
            </Button>
          </div>
        </div>
        <div className="landing-right-container">
          <img
            src={doctorImage}
            alt="picture of multiple doctors standing in a circle"
            className="landing-image"
          />
        </div>
      </div>
    </>
  );
}
export default LandingPage;
