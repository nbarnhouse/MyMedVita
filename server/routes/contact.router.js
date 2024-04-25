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

module.exports = router;
