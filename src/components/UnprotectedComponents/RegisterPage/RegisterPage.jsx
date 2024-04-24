// Import 3rd Party Libraries
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Import Custom Components
import LoginForm from './LoginForm/LoginForm';

// Import MaterialUI CSS
import { Button, Typography } from '@mui/material';

// Import Custom CSS
import './RegisterPage.css';

function RegisterView() {
  useEffect(() => {
    // Change the background color when the component mounts
    document.body.style.backgroundColor = '#782cf6';

    // Revert the background color back when the component unmounts
    return () => {
      document.body.style.backgroundColor = null; // Revert back to original or default
    };
  }, []);

  return (
    <>
      <div className="register-page-container">
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
