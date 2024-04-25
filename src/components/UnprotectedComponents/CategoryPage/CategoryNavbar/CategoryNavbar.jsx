// Import 3rd Party Modules
import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

// Import Custom Components
import Navbar from '../../../AccessoryComponents/Nav/Nav';

function CategoryNavbar() {
  return (
    <>
      <Navbar />
      <h1>Side Nav Category</h1>
    </>
  );
}

export default CategoryNavbar;
