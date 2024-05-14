//import 3rd party libraries
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//custom components

//import Material UI and custom CSS
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
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
  const [insuranceSelection, setInsuranceSelection] = useState(0);
  const loading = useSelector((store) => store.insurance.loading);
  const insuranceList = useSelector((store) => store.insurance.insuranceList);

  // CHECKBOX SELECTION CODE
  const [checkboxState, setCheckboxState] = useState({});

  const insuranceSearchChange = (event) => {
    setSearchByInsurance(event.target.value);
    if (!insuranceSelection) {
      setInsuranceSelection(insuranceList[0].id);
    }
    // CHECKBOX SELECTION CODE
    // if (event.target.value === 'false') {
    //   clearCheckboxes();
    // }
  };

  const insuranceProviderChange = (event) => {
    setInsuranceSelection(event.target.value);
  };

  // CHECKBOX SELECTION CODE
  // const clearCheckboxes = () => {
  //   const resetCheckboxState = {};
  //   for (let insurer of insuranceList) {
  //     resetCheckboxState[`key${insurer.insurer_name}`] = false;
  //   }
  //   setCheckboxState(resetCheckboxState);
  // };

  // CHECKBOX SELECTION CODE
  // const handleCheckChg = (event) => {
  //   setCheckboxState({
  //     ...checkboxState,
  //     [`key${event.target.name}`]: !checkboxState[`key${event.target.name}`],
  //   });
  // };

  const generateInsuranceSearchMask = () => {
    // CHECKBOX SELECTION CODE
    // let searchMask = 0;
    // for (let insurer of insuranceList) {
    //   if (checkboxState[`key${insurer.insurer_name}`]) {
    //     searchMask += +insurer.insurer_code;
    //   }
    // }
    const searchMask = insuranceSelection;

    setInsuranceSearchMask(searchMask);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_INSURANCE_PROVIDERS' });
  }, []);

  useEffect(() => {
    setInsuranceReady(true);

    // CHECKBOX SELECTION CODE
    // const initialCheckboxState = {};
    // for (let insurer of insuranceList) {
    //   initialCheckboxState[`key${insurer.insurer_name}`] = false;
    // }
    // setCheckboxState(initialCheckboxState);
    //
  }, [loading]);

  useEffect(() => {
    generateInsuranceSearchMask();
  }, [checkboxState, insuranceSelection]);

  return (
    insuranceReady && (
      <div className="insurance-search">
        <p className="search-option-label">How do you want to search:</p>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Insurer:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={insuranceSelection}
            label="Provider"
            onChange={insuranceProviderChange}
            sx={{ marginBottom: '20px' }}>
            {insuranceList.map((insurer) => {
              return (
                <MenuItem
                  value={insurer.insurer_code}
                  key={insurer.id}>
                  {insurer.insurer_name}
                </MenuItem>
              );
            })}
            <MenuItem value={0}>All Insurance</MenuItem>
          </Select>
        </FormControl>

        {/* <RadioGroup
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
          <RadioGroup
            className="insurance-selection-formGroup"
            row
            value={insuranceSelection}
            name="insurance-type"
            onChange={insuranceProviderChange}>
            <Grid
              className="insurance-grid"
              container
              spacing={-20}
              justifyContent={'center'}
              wrap="wrap">
              {insuranceList.map((insurer) => {
                return (
                  <Grid
                    key={insurer.id}
                    item
                    xs={3}>
                    <FormControlLabel
                      value={insurer.insurer_code}
                      control={<Radio />}
                      label={insurer.insurer_name}
                    /> */}

        {/* 
                    CHECKBOX SELECTION CODE
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
                    /> */}
        {/* </Grid>
                );
              })}
            </Grid>
          </RadioGroup>
        )} */}
        {/* <p>Control State: {JSON.stringify(checkboxState)}</p>
        <p>Insurance Search Mask: {insuranceSearchMask}</p> */}
      </div>
    )
  );
}

export default MarketplaceInsuranceSelect;
