const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET (READ) user details
router.get('/', (req, res) => {
  const sqlText = `
  SELECT "id", "first_name", "last_name", "email", "phone", "dob", "gender", "street_address", "city", "state", "zip" FROM "user" WHERE "id"=$1;
  `;

  pool
    .query(sqlText, [req.user.id])
    .then((dbRes) => {
      res.send(dbRes.rows[0]);
    })
    .catch((dbError) => {
      console.log('Error in retrieving user details from DB', dbError);
      res.sendStatus(500);
    });
});

// PUT (UPDATE) Route
router.put('/:id', (req, res) => {
  const queryText = `
    UPDATE "user"
    SET "first_name" = $1, "last_name" = $2, "email" = $3, "phone" = $4, "dob" = $5, "gender" = $6, "street_address" = $7, "city" = $8, "state" = $9, "zip" = $10
    WHERE "id" = $11;
  `;

  sqlValues = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.phone,
    req.body.dob,
    req.body.gender,
    req.body.street_address,
    req.body.city,
    req.body.state,
    req.body.zip,
    req.body.id,
  ];

  pool
    .query(queryText, sqlValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((dbError) => {
      console.log('Error in updating user details', dbError);
      res.sendStatus(500);
    });
});

module.exports = router;

// Comments to generate api doc:
/**
 * @api {get} /api/userDetails Get User Details
 * @apiName Get User Details
 * @apiGroup UserDetails
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
 */
