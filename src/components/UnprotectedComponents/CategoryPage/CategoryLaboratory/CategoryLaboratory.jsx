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

function CategoryLaboratory() {
  const laboratoryList = useSelector(
    (store) => store.categoryReducer.laboratoryReducer
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LABORATORY' });
  });

  return (
    <div className="category-container">
      <Navbar />
      <div className="category-bottom-container">
        <CategoryNavbar />
        <div className="category-right-container">
          <h1 className="category-header">CATEGORY LABORATORY</h1>
        </div>
      </div>
    </div>
  );
}

export default CategoryLaboratory;
