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
      <div>
        <h1>Landing Page</h1>
      </div>
    </>
  );
}

export default LandingPage;
