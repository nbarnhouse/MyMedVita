//import 3rd party libraries
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

//custom components

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

import './MarketplaceInsuranceSelect.css';

function MarketplaceInsuranceSelect({
  searchByInsurance,
  setSearchByInsurance,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const insuranceSearchChange = (event) => {
    setSearchByInsurance(event.target.value);
    console.log('New Search Value:', event.target.value);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_INSURANCE_PROVIDERS' });
  }, []);

  return (
    <div className="insurance-search">
      <p className="search-option-label">How do you want to search:</p>
      <RadioGroup
        className="insurance-type-group"
        row
        value={searchByInsurance}
        name="insurance-type"
        onChange={insuranceSearchChange}>
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

      {searchByInsurance === 'true' && <p>Add Selection options here</p>}
      <p>Current Selection Value: {searchByInsurance}</p>
    </div>
  );
}

export default MarketplaceInsuranceSelect;
