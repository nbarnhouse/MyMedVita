// Import 3rd Party Libraries
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// CUSTOM COMPONENTS
import Navbar from '../../../AccessoryComponents/Nav/Nav';
import CategoryNavbar from '../CategoryNavbar/CategoryNavbar';

// Import Material UI and Custom CSS
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function CategoryRadiology() {
  const radiologyList = useSelector(
    (store) => store.categoryReducer.radiologyReducer
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_RADIOLOGY' });
  });

  return (
    <div className="category-container">
      <Navbar />
      <div className="category-bottom-container">
        <CategoryNavbar />
        <div className="category-right-container">
          <h1 className="category-header">CATEGORY RADIOLOGY</h1>
        </div>
      </div>
    </div>
  );
}

export default CategoryRadiology;
