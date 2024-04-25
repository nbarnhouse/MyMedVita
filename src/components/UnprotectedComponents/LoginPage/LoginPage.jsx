// Import 3rd Party Libraries
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

// Import Custom Components
import logoImage from './images/MMV - Final Logo White.png';

// Import Material UI
import { TextField, Button, Grid, Typography } from '@mui/material';

// Import Custom CSS
import './LoginPage.css';
import { Router } from 'react-router-dom/cjs/react-router-dom.min';

function LoginPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User: ', user);

    dispatch({
      type: 'LOGIN',
      payload: {
        username: user.email,
        password: user.password,
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      <div className="login-content-container">
        <div className="login-left-container">
          <Button component={RouterLink} to="/">
            <img src={logoImage} alt="Picture of the company logo" />
          </Button>
        </div>
        <div className="login-right-container">
          <form onSubmit={handleSubmit} style={{ width: '60%' }}>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  style={{ textAlign: 'center', fontSize: '30px' }}
                >
                  Welcome Back!
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  name="email"
                  fullWidth
                  value={user.email}
                  onChange={handleChange}
                  style={{
                    backgroundColor: 'white',
                  }}
                  required
                ></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  variant="outlined"
                  fullWidth
                  value={user.password}
                  onChange={handleChange}
                  style={{
                    backgroundColor: 'white',
                  }}
                  required
                  type="password"
                ></TextField>
              </Grid>
              <div className="login-button-container">
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
                  Login
                </Button>
              </div>
            </Grid>
          </form>
          <p className="login-page-paragraph">
            Not a member yet? Click{' '}
            <Link to="/register" className="login-register-link">
              HERE
            </Link>{' '}
            to register
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
