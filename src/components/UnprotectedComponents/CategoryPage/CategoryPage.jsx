// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// CUSTOM COMPONENTS
import Navbar from '../../AccessoryComponents/Nav/Nav';
import CategoryNavbar from './CategoryNavbar/CategoryNavbar';

function CategoryPage() {
  const history = useHistory();

  return (
    <div className="category-container">
      <Navbar />
      <div className="category-bottom-container">
        <CategoryNavbar />
        <div className="category-right-container"></div>
      </div>
    </div>
  );
}

export default CategoryPage;
