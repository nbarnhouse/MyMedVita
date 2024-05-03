const express = require('express');
require('dotenv').config();
const axios = require('axios');
const pool = require('../modules/pool');
//const pool = require('../modules/pool');
const router = express.Router();

const API_KEY = process.env.GEOCODIO_API_KEY;

//GET Geocode API Data
router.get('/:zip', async (req, res) => {
  const zip_code = req.params.zip;

  let endpointURL = `https://api.geocod.io/v1.7/geocode?postal_code=${zip_code}&api_key=${API_KEY}`;

  try {
    // check if zip resides in database
    const dbQuery = `SELECT * FROM "geo_zip" WHERE "zip" = $1;`;
    const dbResult = await pool.query(dbQuery, [zip_code]);

    console.log('DB Results:', dbResult.rows, ' -', zip_code);
    let results = {};

    // if not in database, get from geocodio
    if (dbResult.rows.length === 0) {
      console.log('Not in DB, getting from Geocodio.');
      const codioResponse = await axios.get(endpointURL);
      const searchData = codioResponse.data.results[0].location;

      results = { lat: searchData.lat, long: searchData.lng };
      console.log('Results:', results);

      // store data in geo_zip
      const storeZipQueryText = `INSERT INTO "geo_zip" ("zip", "lat", "long")
        VALUES ($1, $2, $3);`;
      const storeZipQueryArgs = [zip_code, results.lat, results.long];
      await pool.query(storeZipQueryText, storeZipQueryArgs);
      res.send(results);
    } else {
      results = {
        lat: dbResult.rows[0].lat,
        long: dbResult.rows[0].long,
      };
      res.send(results);
    }
  } catch (err) {
    console.error('ERROR in /location/:zip GET route', err);
    res.sendStatus(500);
  }
});

module.exports = router;
