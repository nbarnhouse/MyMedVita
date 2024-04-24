// Import 3rd Party Libraries
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import Custom Components
import LoginForm from './LoginForm/LoginForm';
import purpleLogo from './Images/purple_logo.png';

// Import MaterialUI CSS
import { Button, Typography } from '@mui/material';

// Import Custom CSS
import './RegisterPage.css';

function RegisterView() {
  // Change the background color when the component mounts
  useEffect(() => {
    document.body.style.backgroundColor = '#782cf6';

    // Revert the background color back when the component unmounts
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return (
    <>
      <div className="register-page-container">
        <Button
          color="inherit"
          component={RouterLink}
          to="/home"
          className="login-logo-button"
        >
          <img
            src={purpleLogo}
            alt="Logo"
            style={{
              maxWidth: '100px',
              maxHeight: '100%',
            }}
          />
        </Button>
        <div className="register-form-container">
          <Typography
            variant="h6"
            style={{
              textAlign: 'center',
              fontSize: '30px',
              fontWeight: 'bolder',
            }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="h5"
            style={{
              textAlign: 'center',
              fontSize: '12px',
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
