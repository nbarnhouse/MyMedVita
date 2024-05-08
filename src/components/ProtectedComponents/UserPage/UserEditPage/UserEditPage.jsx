//Page was set up just to test routes, feel free to change set up

import React, { useState } from 'react';
import LogOutButton from '../../../AccessoryComponents/LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from '@mui/material';
import UserNavBar from '../UserNavBar/UserNavBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import TextField from '@mui/material/TextField';

function UserEditPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  //setting initial values
  const [updating, setUpdating] = useState(true);
  const [firstNameValue, setFirstNameValue] = useState(user.first_name);
  const [lastNameValue, setLastNameValue] = useState(user.last_name);
  const [genderValue, setGenderValue] = useState(user.gender);
  const [dobValue, setDobValue] = useState(user.dob);
  const [emailValue, setEmailValue] = useState(user.email);
  const [phoneValue, setPhoneValue] = useState(user.phone);
  const [streetAddressValue, setStreetAddressValue] = useState(
    user.street_address
  );
  const [cityValue, setCityValue] = useState(user.city);
  const [stateValue, setStateValue] = useState(user.state);
  const [zipCodeValue, setZipCodeValue] = useState(user.zip);

  function changeUpdating() {
    setUpdating(!updating);
  }

  async function updateUserInfo() {
    try {
      const updatedUserInfo = {
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone: phoneValue,
        dob: dobValue,
        gender: genderValue,
        email: emailValue,
        street_address: streetAddressValue,
        city: cityValue,
        state: stateValue,
        zip: zipCodeValue,
      };

      await axios.put('/api/user/update', updatedUserInfo);
      window.location.reload();

      //changeUpdating();
    } catch (error) {
      console.log('Error updating user information:', error);
      // Handle error
    }
  }

  return (
    <div className="saved-container">
      <div className="saved-bottom-container">
        <UserNavBar />
        <div className="saved-right-container">
          <h2>Hello, {user.first_name}!</h2>
          <p>Account Details:</p>
          {!updating && (
            <>
              <p>Email: {emailValue}</p>
              <p>
                Address:{' '}
                {streetAddressValue +
                  ', ' +
                  cityValue +
                  ', ' +
                  stateValue +
                  ' ' +
                  zipCodeValue}
              </p>
              <Button
                onClick={changeUpdating}
                variant="contained"
                color="primary"
                style={{
                  whiteSpace: 'pre-line',
                  wordWrap: 'break-word',
                  maxWidth: '200px',
                  backgroundColor: '#24496b',
                  transition: 'font-size 0.3s ease', // Add transition for smooth effect
                  fontSize: '1rem', // Set initial font size
                }}
                onMouseEnter={(e) => (e.target.style.fontSize = '1.1rem')} // Increase font size on hover
                onMouseLeave={(e) => (e.target.style.fontSize = '1rem')} // Reset font size on mouse leave
              >
                Update Info
              </Button>
            </>
          )}
          {updating && (
            <>
              <div>
                <TextField
                  value={firstNameValue}
                  onChange={(e) => setFirstNameValue(e.target.value)}
                  label="First Name"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={lastNameValue}
                  onChange={(e) => setLastNameValue(e.target.value)}
                  label="Last Name"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  label="Email"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={streetAddressValue}
                  onChange={(e) => setStreetAddressValue(e.target.value)}
                  label="Street Address"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={cityValue}
                  onChange={(e) => setCityValue(e.target.value)}
                  label="City"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={stateValue}
                  onChange={(e) => setStateValue(e.target.value)}
                  label="State"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={zipCodeValue}
                  onChange={(e) => setZipCodeValue(e.target.value)}
                  label="Zipcode"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={genderValue}
                  onChange={(e) => setGenderValue(e.target.value)}
                  label="Gender"
                ></TextField>
              </div>
              <div>
                <TextField
                  type="date"
                  value={dobValue}
                  onChange={(e) => setDobValue(e.target.value)}
                  label="Date of Birth"
                ></TextField>
              </div>
              <div>
                <TextField
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                  label="Phone"
                ></TextField>
              </div>

              <button
                onClick={() => {
                  changeUpdating();
                  updateUserInfo();
                  history.push('/profile');
                }}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserEditPage;
