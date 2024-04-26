const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get codes and descriptions to suggest to user as they type in search bar
router.get('/query/:query', async (req, res) => {
  try {
    const query = req.params.query; //get search query from request(what the user is typing)
    console.log('Received query:', query);
    const client = await pool.connect();
    const result = await client.query(
      `SELECT primary_code, description FROM service_codes WHERE CAST(primary_code AS TEXT) ILIKE $1 OR description ILIKE $1`,
      [`%${query}%`]
    );
    client.release();

    // Send the matching results back to the client
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing search query:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get providers that offer searched for procedure
router.get('/rates/:procedureCode', async (req, res) => {
  try {
    const { procedureCode } = req.params;

    const query = `
            SELECT *
            FROM rates
            WHERE "CPT_CODE" = $1;
        `;

    const result = await pool.query(query, [procedureCode]);
    console.log('RESULT', result);

    res.json(result.rows);
  } catch (error) {
    console.error('Error searching for providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Saved search routes

// get saved searches by user
router.get('/saved/:user_id', (req, res) => {
  const user = req.params.user_id;

  const queryText = `SELECT "CPT_Code", "service_codes"."description" AS "procedure", 
    "search_zip" AS "zip", "search_distance" AS "distance" FROM "user_searches"
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

module.exports = router;
