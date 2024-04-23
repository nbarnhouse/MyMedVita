// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

// Import Material UI
import { Button } from '@mui/material';

// Import Custom CSS
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <div className="main-content-container">
        <div className="main-left-container">
          <h1 className="landing-header">MyMedVita</h1>
          <p className="landing-paragraph">
            Your Compass for Healthcare Prices
          </p>
          <p className="landing-paragraph">Shop. Locate. Review. Contact</p>
          <div className="main-button-container">
            <Button
              variant="outlined"
              sx={{ backgroundColor: '#782cf6', color: 'white' }}
            >
              Shop
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#782cf6',
                color: 'white',
                margin: '10px 10px',
              }}
            >
              View Features
            </Button>
          </div>
        </div>
        <div className="main-right-container"></div>
      </div>
    </>
  );
}

export default LandingPage;
