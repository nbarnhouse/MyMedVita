/**
 * @file API routes for service queries and provider rates
 * @module routes/api
 * @requires express
 * @requires ../modules/pool
 */

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * @api {get} /api/query/:query Get codes and descriptions
 * @apiName GetCPTCodesAndDescriptions
 * @apiGroup Procedures
 * 
 * @apiParam {String} query Search query entered by the user.
 * 
 * @apiSuccess {String} primary_code Primary code of the service.
 * @apiSuccess {String} description Description of the service.
 */

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

/**
 * @api {get} /api/rates/:procedureCode Get providers that offer specified procedure, procedure rate, and all provider details
 * @apiName GetProvidersAndRatesForProcedure
 * @apiGroup Provider
 * 
 * @apiParam {String} procedureCode Code for the procedure.
 * 
 * @apiSuccess {Object[]} Object[] of all providers that offer specified procedure with negotiated rate, and provider details such as address, phone number, etc.
 */

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

/**
 * @api {get} /api/rates/:procedureCode/:insuranceMask Get providers for a procedure with insurance
 * @apiName GetProvidersForProcedureWithInsuranceRate
 * @apiGroup Provider
 * 
 * @apiParam {String} procedureCode Code for the procedure.
 * @apiParam {Number} insuranceMask Mask for the insurance provider.
 * 
 * @apiSuccess {Object[]} rates Array of provider rates based on chosen insurance provider.
 */

//get providers that offer searched for procedure AND insuranceProvider
router.get('/rates/:procedureCode/:insuranceMask', async (req, res) => {
  try {
    const { procedureCode, insuranceMask } = req.params;

    const query = `
            SELECT "rates".*, "insurance_providers"."insurer_code"
            FROM rates
            JOIN "insurance_providers" ON "insurance_providers"."id" = "rates"."insurer_id"
            WHERE "CPT_CODE" = $1;
        `;

    const proceduresResult = await pool.query(query, [procedureCode]);
    console.log('PROCEDURES RESULT LENGTH', proceduresResult.rows.length);
    console.log('Searching by Mask:', insuranceMask);

    let result = proceduresResult.rows;

    if (+insuranceMask) {
      result = result.filter((resultRow) => {
        return +resultRow.insurer_code & +insuranceMask;
      });
    }

    console.log(`Returning ${result.length} records for mask ${insuranceMask}`);

    res.json(result);
  } catch (error) {
    console.error('Error searching for providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
