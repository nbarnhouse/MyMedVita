const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * @api {get} /api/saved/:user_id Get list of saved searches by user
 * @apiName GetSavedSearches
 * @apiGroup Saved Searches
 *
 * @apiParam {Number} user_id User ID.
 *
 * @apiSuccess {Object[]} searches  Array of Saved Searches by User ID.
 * @apiSuccess {Number} obj.CPT_Code CPT Code of procedure.
 * @apiSuccess {String} obj.procedure Description of Procedure.
 * @apiSuccess {String} obj.zip Originating zip code of search.
 * @apiSuccess {Number} obj.distance Search radius in miles.
 * @apiSuccess {Number} obj.insurance_mask Insurance Provider search mask of search.
 * @apiSuccess {Number} obj.id ID of search.
 *
 * @apiError (500) {Object} error Error information.
 */
// Saved search routes
// get saved searches by user
router.get('/:user_id', (req, res) => {
  const user = req.params.user_id;

  const queryText = `SELECT "CPT_Code", "service_codes"."description" AS "procedure", 
    "search_zip" AS "zip", "search_distance" AS "distance", "insurance_mask", 
    "user_searches"."id" AS "id" FROM "user_searches"
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

/**
 * @api {post} /api/saved Create New Saved Search Record
 * @apiName PostSavedSearch
 * @apiGroup Saved Searches
 *
 * @apiBody {Number} user_id  Users ID.
 * @apiBody {Number} CPT_Code CPT Code of procedure.
 * @apiBody {String} zip Originating zip code of search.
 * @apiBody {Number} distance Search radius in miles.
 * @apiBody {Number} insurance_mask=0 Insurance Provider search mask of search.
 *
 * @apiSuccess (200) {String} success-A Search Results Already Exist ID:user_id
 * @apiSuccess (200) {String} success-B Search successully saved
 *
 */
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
      res.status(200).send(`Search Results Already Exist ID:${user}`);
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

/**
 * @api {delete} /api/saved/:id Delete saved search by ID (individual record delete)
 * @apiName DeleteSavedSearch
 * @apiGroup Saved Searches
 *
 * @apiParam {Number} id  ID of Saved Search Record
 *
 */

// delete saved search by id (individual record delete)
router.delete('/:id', (req, res) => {
  const queryArgs = [+req.params.id];
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

/**
 * @api {delete} /api/saved/all/:user_id Delete all saved searches by User ID
 * @apiName DeleteSavedSearchByUser
 * @apiGroup Saved Searches
 *
 * @apiParam {Number} user_id  User ID of user whose records will be deleted
 *
 */

// delete all saved searches by user_id (multiple record delete record delete)
router.delete('/all/:user_id', (req, res) => {
  const queryArgs = [+req.params.user_id];
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
