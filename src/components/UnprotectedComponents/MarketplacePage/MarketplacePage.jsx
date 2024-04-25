// Import 3rd Party Libraries
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import ProcedureSearchBar from './ProcedureSearchBar/ProcedureSearchBar';

// Import Material UI and Custom CSS
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './MarketplacePage.css';

function MarketplacePage() {
  const [query, setQuery] = useState({
    searchTerm: '',
    zip: '',
    distance: 25,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  // Function to handle user input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle user form submission
  const handleSubmit = (event) => {
    // Prevent the page from refreshing
    event.preventDefault();

    // Validate Zip Code = 5 digits and is a number
    const { zip, distance } = query;
    if (zip.length !== 5 || isNaN(Number(zip))) {
      alert('Please enter a valid 5-digit zip code.');
      setQuery((prev) => ({ ...prev, zip: '' }));
      return;
    }

    dispatch({
      type: 'SUBMIT_DISTANCE_DATA',
      payload: {
        zip,
        distance,
      },
    });
    history.push('/results');
  };

  return (
    <>
      <NavBar />
      <div className="search-container">
        <h1>MyMedVita Marketplace</h1>
        <p>Click HERE for a CPT Reference Guide</p>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} wrap="wrap">
            <Grid item xs={12}>
              <ProcedureSearchBar />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Zip Code"
                name="zip"
                variant="outlined"
                onChange={handleChange}
                value={query.zip}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Distance (Miles)"
                name="distance"
                variant="outlined"
                value={query.distance}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </div>
    </>
  );
}

export default MarketplacePage;
