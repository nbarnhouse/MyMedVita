// Import 3rd Party Libraries
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

function ProviderDataPage() {
  const history = useHistory();
  const provider = useSelector((store) => store.provider);

  const handleBack = () => {
    history.push('/results');
  };

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
