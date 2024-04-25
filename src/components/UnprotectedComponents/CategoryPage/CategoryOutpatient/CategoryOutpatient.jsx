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
import './CategoryOutpatient.css';

function CategoryOutpatient() {
  const outpatientList = useSelector(
    (store) => store.categoryReducer.outpatientReducer
  );
  console.log('OUTPATIENT LIST: ', outpatientList);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_OUTPATIENT' });
  }, [dispatch]);

  return (
    <div className="category-container">
      <Navbar />
      <div className="category-bottom-container">
        <CategoryNavbar />
        <div className="category-right-container">
          <h1 className="category-header">CATEGORY OUTPATIENT</h1>
          <p>{JSON.stringify(outpatientList)}</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryOutpatient;
