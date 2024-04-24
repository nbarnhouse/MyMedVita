// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

function LandingPage() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <h1>Landing Page</h1>
    </>
  );
}

export default LandingPage;
