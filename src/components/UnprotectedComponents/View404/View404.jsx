// Import 3rd Party Libraries
import React from 'react';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import notFoundImage from './images/not_found.avif';

// Import Custom CSS
import './View404.css';

function View404() {
  return (
    <>
      <NavBar />
      <div className="error-container">
        <p className="error-number">ERROR: 404</p>
        <h1 className="error-header">
          Uh Oh The Page You're Looking For Either Can't Be Found Or You Don't
          Have Access To It!
        </h1>
      </div>
    </>
  );
}

export default View404;
