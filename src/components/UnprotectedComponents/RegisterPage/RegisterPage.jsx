// Import 3rd Party Libraries
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import Custom Components
import LoginForm from './LoginForm/LoginForm';

// Import MaterialUI CSS
import { Button, Typography } from '@mui/material';

// Import Custom CSS
import './RegisterPage.css';

function RegisterView() {
  return (
    <>
      <div className="register-page-container">
        <Button
          color="inherit"
          component={RouterLink}
          to="/home"
          className="login-logo-button"
        >
          {/* <img
            src={logoImage}
            alt="Logo"
            style={{
              maxWidth: '100px',
              maxHeight: '100%',
              margin: '3rem auto',
            }}
          /> */}
        </Button>
        <div className="register-form-container">
          <Typography
            variant="h6"
            style={{
              textAlign: 'center',
              fontSize: '30px',
            }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="h5"
            style={{
              textAlign: 'center',
              fontSize: '15px',
              marginBottom: '20px',
            }}
          >
            All Fields Marked * Are Required
          </Typography>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default RegisterView;
