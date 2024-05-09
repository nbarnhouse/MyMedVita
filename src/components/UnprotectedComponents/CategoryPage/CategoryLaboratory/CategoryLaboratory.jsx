// Import 3rd Party Libraries
import React, { useEffect } from 'react';
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_LABORATORY' });
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    dispatch({ type: 'FETCH_OUTPATIENT' });

    return () => {
      document.body.style.overflow = '';
    };
  }, [dispatch]);

  return (
    <div className="category-container">
      <Navbar />
      <div className="category-bottom-container">
        <CategoryNavbar />
        <div className="category-right-container">
          <h1 className="category-header">Laboratory & Pathology Codes</h1>
          <TableContainer component={Paper} sx={{ margin: '20px auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>Primary Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laboratoryList &&
                  laboratoryList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.primary_code}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default CategoryLaboratory;
