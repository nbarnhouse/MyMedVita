// Import 3rd Party Libraries
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Import Custom Components
import NavBar from '../../AccessoryComponents/Nav/Nav';
import Footer from '../../AccessoryComponents/Footer/Footer';

// Import Material UI and Custom CSS
import { Button } from '@mui/material';
import './ProviderDataPage.css';

function ProviderDataPage() {
  const history = useHistory();
  const location = useLocation();
  const provider = location.state?.provider || {};

  useEffect(() => {
    console.log('Provider on details page:', provider);
  }, [provider]);

  // Function to user back click
  const handleBackClick = () => {
    history.push('/results');
  };

  const isValidProvider = provider.provider_lat && provider.provider_long;
  const centerLat = isValidProvider ? parseFloat(provider.provider_lat) : 0;
  const centerLon = isValidProvider ? parseFloat(provider.provider_long) : 0;

  return (
    <>
      <NavBar />
      <h1>Provider Details</h1>
      <div></div>

      <button onClick={handleBack}>Back</button>
    </>
  );
}

export default ProviderDataPage;
