const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Saved search routes
// get saved searches by user
router.get('/:user_id', (req, res) => {
  const user = req.params.user_id;

  const queryText = `SELECT "CPT_Code", "service_codes"."description" AS "procedure", 
    "search_zip" AS "zip", "search_distance" AS "distance", "insurance_mask" FROM "user_searches"
    JOIN "service_codes" ON "user_searches"."CPT_Code" = "service_codes"."primary_code" 
    WHERE "user_id" = $1;`;
  const queryArgs = [user];

  // conduct query and return results
  pool
    .query(queryText, queryArgs)
    .then((response) => {
      res.send(response.rows).status(200);
    })
    .catch((err) => {
      console.error('ERROR in /saved/:user_id GET:', err);
      res.status(500).send(err);
    });
});

// post new saved search
router.post('/', async (req, res) => {
  // Assemble Data
  const user = +req.body.user_id; // Number
  const CPT_Code = +req.body.CPT_Code; // Number
  const zip = req.body.zip; // Text
  const distance = +req.body.distance; // Number
  const insuranceMask = +req.body.insuranceMask ? +req.body.insuranceMask : 0;
  const queryArgs = [user, CPT_Code, zip, distance, insuranceMask];

  try {
    // Check to see if search already exists...
    const checkQueryText = `SELECT * FROM "user_searches" 
      WHERE "user_id" = $1 AND "CPT_Code" = $2 
      AND "search_zip" = $3 AND "search_distance" = $4
      AND "insurance_mask" = $5;`;

    const checkResults = await pool.query(checkQueryText, queryArgs);

    if (checkResults.rows.length) {
      res.status(406).send(`Search Results Already Exist ID:${user}`);
    } else {
      const queryText = `INSERT INTO "user_searches" 
      ("user_id", "CPT_Code", "search_zip", "search_distance", "insurance_mask")
      VALUES ($1, $2, $3, $4, $5);`;
      pool
        .query(queryText, queryArgs)
        .then((results) => {
          res.send('Search successully saved').status(200);
        })
        .catch((err) => {
          console.error('ERROR in saved/ POST Route:', err);
          res.sendStatus(500);
        });
    }
  } catch (err) {
    console.error('ERROR: ', err);
    res.sendStatus(500);
  }
});

// delete saved search by id (individual record delete)
router.delete('/:id', (req, res) => {
  const queryArgs = [req.params.id];
  const queryText = `DELETE FROM "user_searches" WHERE "id" = $1;`;

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(`Saved Query ID ${req.params.id} deleted.`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR in saved/:id DELETE Route:', err);
      res.sendStatus(500);
    });
});

// delete all saved searches by user_id (multiple record delete record delete)
router.delete('/all/:user_id', (req, res) => {
  const queryArgs = [req.params.user_id];
  const queryText = `DELETE FROM "user_searches" WHERE "user_id" = $1;`;

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      console.log(
        `All Saved Queries by User ID ${req.params.user_id} deleted.`
      );
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('ERROR in saved/:id DELETE Route:', err);
      res.sendStatus(500);
    });
});

module.exports = router;