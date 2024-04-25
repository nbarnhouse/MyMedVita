// Import 3rd Party Libraries
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// CUSTOM COMPONENTS
import Navbar from '../../../AccessoryComponents/Nav/Nav';
import CategoryNavbar from '../CategoryNavbar/CategoryNavbar';

// Import Material UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

function CategoryOutpatient() {
  const outpatientList = useSelector(
    (store) => store.categoryReducer.outpatientReducer
  );
  console.log('OUTPATIENT LIST: ', outpatientList);
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

export default CategoryOutpatient;
