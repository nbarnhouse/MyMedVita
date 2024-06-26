// imports:
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import moment from 'moment';

// imports that we created:
import NavBar from '../../../AccessoryComponents/Nav/Nav';
import UserNavBar from '../UserNavBar/UserNavBar';
import './UserEditPage.css';

// Material UI Imports:
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

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

  // change the date of birth so that it is the right form
  // dobValue is the exact date from the database, this is is user friendly!
  // DOB for the input field should be in the format YYYY-MM-DD
  const formattedDate = moment(dobValue).format('YYYY-MM-DD');

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
      <NavBar />
      <div className="saved-bottom-container">
        <UserNavBar />
        <div className="saved-right-container">
          <h2>Edit Profile</h2>
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
              <div className="userEditPageIndependentInputTextDivs">
                {/* Div for the First and Last Name Input Fields */}
                <div className="userEditPageSideBySideInput">
                  <div className="firstInputField">
                    <TextField
                      value={firstNameValue}
                      onChange={(e) => setFirstNameValue(e.target.value)}
                      label="First Name"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                  <div>
                    <TextField
                      value={lastNameValue}
                      onChange={(e) => setLastNameValue(e.target.value)}
                      label="Last Name"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                </div>
              </div>

              {/* Div for the Email address and the phone number */}
              <div className="userEditPageIndependentInputTextDivs">
                <div className="userEditPageSideBySideInput">
                  <div className="firstInputField">
                    <TextField
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      label="Email"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                  <div>
                    <PhoneInput
                      value={phoneValue}
                      // you only have to pass the hook in for the onChange
                      onChange={setPhoneValue}
                      label="Phone"
                      international
                      defaultCountry="US"
                      className="PhoneInput"
                      inputClassName="PhoneInputInput"
                    ></PhoneInput>
                  </div>
                </div>
              </div>

              {/* Div for the DOB and Gender */}
              <div className="userEditPageIndependentInputTextDivs">
                <div className="userEditPageSideBySideInput">
                  <div className="firstInputField">
                    <TextField
                      type="date"
                      value={formattedDate}
                      onChange={(e) => setDobValue(e.target.value)}
                      label="Date of Birth"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                  <div>
                    <TextField
                      value={genderValue}
                      onChange={(e) => setGenderValue(e.target.value)}
                      label="Gender"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                </div>
              </div>

              {/* Div for the street and city */}
              <div className="userEditPageIndependentInputTextDivs">
                <div className="userEditPageSideBySideInput">
                  <div className="firstInputField">
                    <TextField
                      value={streetAddressValue}
                      onChange={(e) => setStreetAddressValue(e.target.value)}
                      label="Street Address"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                  <div>
                    <TextField
                      value={cityValue}
                      onChange={(e) => setCityValue(e.target.value)}
                      label="City"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                </div>
              </div>

              {/* Div for state and zipcode */}
              <div className="userEditPageIndependentInputTextDivs">
                <div className="userEditPageSideBySideInput">
                  <div className="firstInputField">
                    <TextField
                      value={stateValue}
                      onChange={(e) => setStateValue(e.target.value)}
                      label="State"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                  <div className="userEditPageIndependentInputTextDivs">
                    <TextField
                      value={zipCodeValue}
                      onChange={(e) => setZipCodeValue(e.target.value)}
                      label="Zipcode"
                      className="userEditPageInput"
                    ></TextField>
                  </div>
                </div>
              </div>

              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: '#782cf6',
                  color: 'white',
                }}
                onClick={() => {
                  changeUpdating();
                  updateUserInfo();
                  history.push('/profile');
                }}
              >
                Save
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserEditPage;
