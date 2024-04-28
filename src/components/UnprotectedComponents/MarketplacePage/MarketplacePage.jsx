//import 3rd party libraries
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

//custom components
import NavBar from '../../AccessoryComponents/Nav/Nav';
import ProcedureSearchBar from './ProcedureSearchBar/ProcedureSearchBar';

//import Material UI and custom CSS
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './MarketplacePage.css';

function MarketplacePage() {
  const [query, setQuery] = useState({
    procedureCode: '',
    zip: '',
    distance: 25,
  });
  const [procedureSearchCode, setProcedureSearchCode] = useState('');
  const [searchByInsurance, setSearchByInsurance] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { zip, distance } = query;
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
      console.log('DATA:', data);
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

  const handleSearchQueryChange = (searchQuery) => {
    console.log('Search query:', searchQuery);
    const procedureCode = searchQuery.substring(
      0,
      searchQuery.indexOf('-') - 1
    );
    console.log(procedureCode);
    setProcedureSearchCode(procedureCode); // Set procedureSearchCode in state
  };

  return (
    <>
      <NavBar />
      <div className="search-container">
        <Typography
          variant="h3"
          component="h1"
          className="search-header"
          sx={{ fontWeight: 'bold', marginTop: '3rem' }}>
          <span style={{ color: '#782cf6' }}>My</span>MedVita
          <span style={{ verticalAlign: 'super', fontSize: '0.5em' }}>
            ™
          </span>{' '}
          Marketplace
        </Typography>
        <p className="search-paragraph">
          Click{' '}
          <Link
            to="/category/outpatient"
            className="search-category-link">
            HERE
          </Link>{' '}
          for a CPT Reference Guide
        </p>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            wrap="wrap">
            <Grid
              item
              xs={12}>
              <ProcedureSearchBar
                onSearchQueryChange={handleSearchQueryChange}
              />
            </Grid>
            <Grid
              item
              xs={12}>
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
            <Grid
              item
              xs={12}>
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
                }}>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="25">25</MenuItem>
                <MenuItem value="50">50</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <div className="insurance-search">
            <p className="search-option-label">How do you want to search:</p>
            <RadioGroup
              row
              value={searchByInsurance}
              name="insurance-type"
              onChange={(event) => {
                setSearchByInsurance(event.target.value);
              }}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="By Insurance Options"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="No Insurance"
              />
            </RadioGroup>
            <p>Current Selection Value: {JSON.stringify(searchByInsurance)}</p>
          </div>
          <div className="search-button-container">
            <Button
              type="submit"
              variant="outlined"
              size="large"
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
              Shop Now
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MarketplacePage;
