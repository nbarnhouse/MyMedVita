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
router.post('/', (req, res) => {
  const sqlText = `
    UPDATE "user"
    SET "first_name" = $1, "last_name" = $2, "email" = $3, "phone" = $4, "dob" = $5, "gender" = $6, "street_address" = $7, "city" = $8, "state" = $9, "zip" = $10
    WHERE "id" = $11;
  `;
});

module.exports = router;
