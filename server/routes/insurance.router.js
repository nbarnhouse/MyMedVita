const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * @api {get} /api/insurance Get list of insurance providers
 * @apiName GetInsurerList
 * @apiGroup Insurance
 *
 * @apiSuccess {Object[]} insurers  Array of Insurance Providers.
 * @apiSuccess {Number} obj.id id of Insurance Provider.
 * @apiSuccess {String} obj.insurer_name Name of Insurance Provider.
 * @apiSuccess {Number} obj.insurer_code Unique (power of 2) code of Insurance Provider.
 */

// GET Insurance list from database
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "insurance_providers" ORDER BY "insurer_code";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in /insurance GET route:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
