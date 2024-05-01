// Import 3rd Party Libraries
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// CUSTOM COMPONENTS
import Navbar from '../../../AccessoryComponents/Nav/Nav';
// import UserNavbar from '../SomePath';

// Import Material UI and Custom CSS
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './SavedSearchesPage.css';

function SavedSearchesPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const loading = useSelector((store) => store.savedSearches.loading);
  const savedList = useSelector((store) => store.savedSearches.searchList);

  const [searchDataReady, setSearchDataReady] = useState(false);

  // This function is the same used on the MarketplacePage form submission handler
  // It refactored only to read input data from the button clicked
  // If the fundamental routes used for searches change on MarketplacePage
  // we should change them here as well
  const searchBtnClk = async (event) => {
    event.preventDefault();
    // console.log('Search Button Clicked');
    // console.log('DataSet:', event.target.dataset);

    const zip = event.target.dataset.zip;
    const distance = event.target.dataset.distance;
    const procedureSearchCode = event.target.dataset.code;
    if (zip.length !== 5 || isNaN(Number(zip))) {
      alert('Please enter a valid 5-digit zip code.');
      setQuery((prev) => ({ ...prev, zip: '' }));
      return;
    }

    try {
      const response = await axios.get(
        `/api/search/rates/${encodeURIComponent(procedureSearchCode)}`
      );
      const data = await response.data; //all data for providers that offer searched for procedure
      // console.log('DATA:', data);
      dispatch({
        type: 'SUBMIT_DISTANCE_DATA',
        payload: {
          procedureCode: procedureSearchCode,
          zip,
          distance,
          providers: data, // Pass providers data fetched from the backend to Redux
        },
      });
      history.push('/results');
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  };

  const deleteBtnClk = (event) => {};

  useEffect(() => {
    dispatch({ type: 'FETCH_SEARCHES', payload: user.id });
  }, []);

  useEffect(() => {
    if (loading === false) {
      setSearchDataReady(true);
    }
  }, [loading]);

  return (
    <div className="saved-container">
      <Navbar />
      <div className="saved-bottom-container">
        <h1>User Navbar Placeholder</h1>
        {/* Render user navbar component here
        <UserNavbar or whatever it's going to be called /> */}
        <div className="saved-right-container">
          <h1 className="saved-header">Saved Searches </h1>
          {searchDataReady && (
            <TableContainer
              component={Paper}
              sx={{ margin: '20px auto' }}>
              {savedList.length === 0 ? (
                <h2>
                  I'm sorry, {user.first_name}, but you have no saved searches.
                </h2>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Procedure
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        CPT Code
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Zip Code
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Distance
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        View Again?
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Delete?</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {savedList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.procedure}</TableCell>
                        <TableCell>{item.CPT_Code}</TableCell>
                        <TableCell>{item.zip}</TableCell>
                        <TableCell>{item.distance} mi</TableCell>
                        <TableCell>
                          <Button
                            className="saved-search-clickable"
                            type="button"
                            variant="outlined"
                            onClick={searchBtnClk}
                            data-code={item.CPT_Code}
                            data-zip={item.zip}
                            data-distance={item.distance}
                            data-mask={item.insurance_mask}
                            size="small"
                            sx={{
                              backgroundColor: '#782CF6',
                              color: 'white',
                              margin: '10px auto',
                              '&:hover': {
                                backgroundColor: '#782CF6',
                                color: 'white',
                                transform: 'scale(1.05)',
                              },
                            }}>
                            Search
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <DeleteForeverIcon
                            className="saved-search-clickable"
                            onClick={deleteBtnClk}
                            data-id={item.id}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedSearchesPage;
