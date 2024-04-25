const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

// Define CONTACT_SERVICE, CONTACT_USER, CONTACT_PASSWORD, and
// CONTACT_EMAIL in environment variable

// Establish email transporter
const transporter = nodemailer.createTransport({
  service: process.env.CONTACT_SERVICE,
  auth: {
    user: process.env.CONTACT_USER,
    pass: process.env.CONTACT_PASSWORD,
  },
});

// email message to 'support@myMedvita.com'
// POST route emails support and returns status to client
router.post('/', (req, res) => {
  // construct message
  const messageOptions = {
    from: req.body.email,
    to: process.env.CONTACT_EMAIL,
    subject: `MyMedVita User Question/Feedback - ${req.body.name}`,
    text: req.body.message,
  };

  // console.log('Transporter - Service:', process.env.CONTACT_SERVICE);
  // console.log('Transporter - user:', process.env.CONTACT_USER);
  // console.log('Transporter - Service:', process.env.CONTACT_PASSWORD);
  // console.log('Transporter:', transporter.options);
  // console.log('messageOptions:', messageOptions);

  transporter.sendMail(messageOptions, (error, info) => {
    if (!error) {
      console.log('Email sent:', info.response);
      res.sendStatus(200);
    } else {
      console.log('Error sending email:', error);
      res.sendStatus(500);
    }
  });

  // res.sendStatus(200);
});

module.exports = router;
