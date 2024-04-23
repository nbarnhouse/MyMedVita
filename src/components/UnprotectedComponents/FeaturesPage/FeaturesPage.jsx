// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

function FeaturesPage() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <h1>Features Page</h1>
    </>
  );
}

export default FeaturesPage;
