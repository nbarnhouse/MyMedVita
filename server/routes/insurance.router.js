const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
