// Import 3rd Party Libraries
import React, { useState } from 'react';

// CUSTOM COMPONENTS
import NavBar from '../../AccessoryComponents/Nav/Nav';
import Footer from '../../AccessoryComponents/Footer/Footer';
import doctorImage from './images/doctor_phone.avif';

// Import Material UI and Custom CSS
import { TextField, Button, Grid, Typography, Snackbar } from '@mui/material';
import './ContactPage.css';

function ContactPage() {
  const [newContact, setNewContact] = useState({
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
      <div className="contact-container">
        {/* Snackbar Component */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Thank you for contacting us, a representative will reach out shortly"
          action={
            <>
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackbar}
              >
                UNDO
              </Button>
            </>
          }
        />
        <div className="contact-left-container">
          <img src={doctorImage} alt="picture of a doctor holding a phone" />
        </div>
        <div className="contact-left-container">
          <form
            onSubmit={handleSubmit}
            style={{ margin: 'auto', width: '80%' }}
          >
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Typography
                  variant="h6"
                  style={{
                    textAlign: 'center',
                    fontSize: '30px',
                    fontWeight: 'bolder',
                  }}
                >
                  Contact Us
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={newContact.name}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: 'white' }}
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={newContact.email}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: 'white' }}
                ></TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Message"
                  variant="outlined"
                  fullWidth
                  name="message"
                  multiline
                  rows={4}
                  value={newContact.message}
                  onChange={handleChange}
                  required
                  style={{ backgroundColor: 'white' }}
                ></TextField>
              </Grid>
            </Grid>
            <div className="contact-button-container">
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
