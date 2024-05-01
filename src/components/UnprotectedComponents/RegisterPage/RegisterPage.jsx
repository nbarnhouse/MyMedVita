// Import 3rd Party Libraries
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import Custom Components
import RegisterForm from './RegisterForm/RegisterForm';
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
          to="/"
          className="register-logo-button"
        >
          <h1>
            Welcome to <span className="register-header-span">My</span>MedVita
          </h1>
        </Button>
        <div className="register-form-container">
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
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default RegisterView;
