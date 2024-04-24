import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link as RouterLink } from 'react-router-dom';

// Import MaterialUI CSS
import { TextField, Button, Grid, Typography } from '@mui/material';

function LoginForm() {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    plain_password: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    address_street: '',
    address_city: '',
    address_state: '',
    address_zip: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  // Handle User Input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Handle user form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Submit the information to worker saga
    dispatch({
      type: 'REGISTER',
      payload: newUser,
    });

    // Redirect to the marketplace
    history.push('/marketplace');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} wrap="wrap">
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            value={newUser.firstName}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
            required
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            value={newUser.lastName}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
            required
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            name="email"
            variant="outlined"
            value={newUser.email}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
            required
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="text"
            variant="outlined"
            value={newUser.phoneNumber}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Password"
            name="plain_password"
            type="password"
            variant="outlined"
            value={newUser.plain_password}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
            required
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            variant="outlined"
            type="password"
            style={{ backgroundColor: 'white' }}
            required
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Gender"
            name="gender"
            type="text"
            variant="outlined"
            value={newUser.gender}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            variant="outlined"
            value={newUser.dob}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        {/* Address */}
        <Grid item xs={12} sm={12}>
          <Typography
            variant="h5"
            style={{
              textAlign: 'center',
              fontSize: '30px',
              marginBottom: '5px',
              marginTop: '0px',
            }}
          >
            Address
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Street Address"
            name="address_street"
            type="text"
            variant="outlined"
            value={newUser.address_street}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="City"
            name="address_city"
            type="text"
            variant="outlined"
            value={newUser.address_city}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="State"
            name="address_state"
            type="text"
            variant="outlined"
            value={newUser.address_state}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Zip Code"
            name="address_zip"
            type="text"
            variant="outlined"
            value={newUser.address_zip}
            onChange={handleChange}
            style={{ backgroundColor: 'white' }}
          />
        </Grid>
      </Grid>
      <div className="register-button-container">
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            marginTop: '20px',
            backgroundColor: '#782cf6',
            color: 'white',
          }}
          sx={{
            transition: 'transform 0.3s',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
