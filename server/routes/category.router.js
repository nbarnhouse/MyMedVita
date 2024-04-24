const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get categories and category ids
// returns service types and their associated ids (referenced by service codes)
router.get('/', (req, res) => {
  const queryText = `SELECT "id", "service_type" AS "category" FROM "service_types" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in /category GET:', err);
      res.sendStatus(500);
    });
});

// get codes and descriptions by category (id from service types)
router.get('/codes/:id', (req, res) => {
  const queryText = `SELECT "primary_code", "description", 
    "service_types"."service_type" AS "category" FROM "service_codes"
    JOIN "service_types" ON "service_codes"."type_id" = "service_types"."id"
    WHERE "type_id" = $1 ORDER BY "primary_code";`;
  const queryArgs = [req.params.id];

  pool
    .query(queryText, queryArgs)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in /category/codes/:id GET:', err);
      res.sendStatus(500);
    });
});

// get all codes, descriptions, and categories
router.get('/codes/', (req, res) => {
  const queryText = `SELECT "primary_code", "description", 
    "service_types"."service_type" AS "category" FROM "service_codes"
    JOIN "service_types" ON "service_codes"."type_id" = "service_types"."id"
    ORDER BY "primary_code";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error('ERROR in /category/codes/ GET:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
