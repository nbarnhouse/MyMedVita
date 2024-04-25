// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

function ProviderDataPage() {
  const history = useHistory();

  const handleBack = () => {
    history.push('/results');
  };

  return (
    <>
      <NavBar />
      <h1>Provider Details</h1>
      <div className="left-contianer">
        <h4>Provider:</h4>
        <h4>Procedure:</h4>
        <h4>Address:</h4>
        <h4>Pricing:</h4>
        <h4>Phone Number:</h4>
        <h4>Distance:</h4>
      </div>

      <button onClick={handleBack}>Back</button>
    </>
  );
}

export default ProviderDataPage;
