//import 3rd party libraries
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

//custom components

//import Material UI and custom CSS
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from '@mui/material';

import './MarketplaceInsuranceSelect.css';

function MarketplaceInsuranceSelect({
  insuranceSearchMask,
  setInsuranceSearchMask,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchByInsurance, setSearchByInsurance] = useState(false);
  const [insuranceReady, setInsuranceReady] = useState(false);
  const loading = useSelector((store) => store.insurance.loading);
  const insuranceList = useSelector((store) => store.insurance.insuranceList);

  const [checkboxState, setCheckboxState] = useState({});

  const insuranceSearchChange = (event) => {
    setSearchByInsurance(event.target.value);
    // console.log('New Search Value:', event.target.value);
  };

  const handleCheckChg = (event) => {
    // console.log('Changing checkbox status for:', event.target.name);
    setCheckboxState({
      ...checkboxState,
      [`key${event.target.name}`]: !checkboxState[`key${event.target.name}`],
    });
  };

  const generateInsuranceSearchMask = () => {
    let searchMask = 0;
    for (let insurer of insuranceList) {
      if (checkboxState[`key${insurer.insurer_name}`]) {
        searchMask += +insurer.insurer_code;
      }
    }
    // console.log('New Search Mask:', searchMask);
    setInsuranceSearchMask(searchMask);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_INSURANCE_PROVIDERS' });
  }, []);

  useEffect(() => {
    setInsuranceReady(true);
    const initialCheckboxState = {};
    for (let insurer of insuranceList) {
      initialCheckboxState[`key${insurer.insurer_name}`] = false;
      // console.log(initialCheckboxState);
    }
    setCheckboxState(initialCheckboxState);
  }, [!loading]);

  useEffect(() => {
    generateInsuranceSearchMask();
  }, [checkboxState]);

  return (
    insuranceReady && (
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

        {searchByInsurance === 'true' && (
          <FormGroup className="insurance-selection-formGroup">
            <Grid
              className="insurance-grid"
              container
              spacing={-20}
              // sx={{ width: '75%' }}
              justifyContent={'center'}
              wrap="wrap">
              {insuranceList.map((insurer) => {
                return (
                  <Grid
                    key={insurer.id}
                    item
                    xs={3}>
                    <FormControlLabel
                      label={insurer.insurer_name}
                      control={
                        <Checkbox
                          checked={checkboxState[`key${insurer.insurer_name}`]}
                          onChange={handleCheckChg}
                          name={insurer.insurer_name}
                          value={+insurer.insurer_code}
                        />
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </FormGroup>
        )}
        {/* <p>Control State: {JSON.stringify(checkboxState)}</p>
        <p>Insurance Search Mask: {insuranceSearchMask}</p> */}
      </div>
    )
  );
}

export default MarketplaceInsuranceSelect;
