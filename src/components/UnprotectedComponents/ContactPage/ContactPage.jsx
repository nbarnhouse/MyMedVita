// Import 3rd Party Libraries
import React, { useState } from 'react';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';

// Import Material UI and Custom CSS
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
import './ContactPage.css';

function ContactPage() {
  cont[(newContact, setNewContact)] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Handle user input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Handle Form Submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSnackbarOpen(true);
    setNewContact({
      name: '',
      email: '',
      message: '',
    });
  };

  // Function to close Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <NavBar />
      <h1>Contact Page</h1>
    </>
  );
}

export default ContactPage;
