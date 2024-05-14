// Comments to generate api doc:
/**
 * @api {get} /api/user Get user login details
 * @apiName Get User Login Details
 * @apiGroup User
 *
 * @apiSuccess {String} email User's email.
 * @apiSuccess {String} password User's password.
 *
 * @apiError (500) error Error information.
 */

/**
 * @api {post} /api/user Create New User
 * @apiName Create new user in database.
 * @apiGroup User
 *
 * @apiSuccess {String} first_name First name of the User.
 * @apiSuccess {String} last_name Last name of the User.
 * @apiSuccess {String} email User's email.
 * @apiSuccess {String} phone User's phone number.
 * @apiSuccess {Date} dob User's date of birth.
 * @apiSuccess {String} gender User's gender.
 * @apiSuccess {String} street_address User's street address.
 * @apiSuccess {String} city User's city.
 * @apiSuccess {String} state User's state.
 * @apiSuccess {String} zip User's zip code.
 * @apiSuccess {Number} id ID of the User.
 *
 * @apiError (500) error Error information.
 */

const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
router.post('/register', (req, res, next) => {
  const password = encryptLib.encryptPassword(req.body.password);
  const phone = req.body.phone;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const street_address = req.body.street_address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  const queryText = `INSERT INTO "user" (password, phone,
                    first_name, last_name, email, dob, gender,
                    street_address, city, state, zip)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`;
  pool
    .query(queryText, [
      password,
      phone,
      first_name,
      last_name,
      email,
      dob,
      gender,
      street_address,
      city,
      state,
      zip,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

//Handles PUT request with updated user info
router.put('/update', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const phone = req.body.phone;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const dob = req.body.dob;
  const gender = req.body.gender;
  const street_address = req.body.street_address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  const queryText = `UPDATE "user" SET phone=$1, first_name=$2, last_name=$3, email=$4, dob=$5, gender=$6, street_address=$7, city=$8, state=$9, zip=$10 WHERE id=$11`;
  pool
    .query(queryText, [
      phone,
      first_name,
      last_name,
      email,
      dob,
      gender,
      street_address,
      city,
      state,
      zip,
      userId,
    ])
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log('Error updating user information:', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
