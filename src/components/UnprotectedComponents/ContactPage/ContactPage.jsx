// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import Nav from '../../AccessoryComponents/Nav/Nav';

function ContactPage() {
  const history = useHistory();

  return (
    <>
      <NavBar />
      <h1>Contact Page</h1>
    </>
  );
}

export default ContactPage;
