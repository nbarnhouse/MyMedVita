const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET (READ) user details
router.get('/', (req, res) => {
  const sqlText = `
  SELECT "id", "first_name", "last_name", "email", "phone", "dob", "gender", "street_address", "city", "state", "zip" FROM "user" WHERE "id"=1;
  `;

  pool
    .query(sqlText)
    .then((dbRes) => {
      res.send(dbRes.rows);
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
