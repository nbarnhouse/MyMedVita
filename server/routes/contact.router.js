// Import 3rd Party Modules
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

// Define CONTACT_SERVICE, CONTACT_USER, CONTACT_PASSWORD, and
// CONTACT_EMAIL in environment variable (.env file)

// Establish email transporter
const transporter = nodemailer.createTransport({
  service: process.env.CONTACT_SERVICE,
  auth: {
    user: process.env.CONTACT_USER,
    pass: process.env.CONTACT_PASSWORD,
  },
});

/**
 * @api {post} /support Send User Feedback
 * @apiName SendFeedback
 * @apiGroup Support
 * @apiVersion 1.0.0
 *
 * @apiParam {String} email User's email address.
 * @apiParam {String} name User's name.
 * @apiParam {String} message Feedback message from the user.
 *
 * @apiSuccess (200) {String} email The email of the sender.
 * @apiSuccess (200) {String} name The name of the sender.
 * @apiSuccess (200) {String} message The message content.
 *
 * @apiError (500) {Object} error Error information.
 *
 * @apiDescription This route allows users to send feedback or questions to the support email configured.
 */

router.post('/', (req, res) => {
  const messageOptions = {
    from: req.body.email,
    to: process.env.CONTACT_EMAIL,
    subject: `MyMedVita User Question/Feedback - ${req.body.name}`,
    text: req.body.message,
  };

  transporter.sendMail(messageOptions, (error, info) => {
    if (!error) {
      console.log('Email sent:', info.response);
      res.sendStatus(200);
    } else {
      console.log('Error sending email:', error);
      res.sendStatus(500);
    }
  });
});

// Export Router
module.exports = router;
