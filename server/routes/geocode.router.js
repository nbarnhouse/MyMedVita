const express = require('express');
require('dotenv').config();
const axios = require('axios');
//const pool = require('../modules/pool');
const router = express.Router();

const API_KEY = process.env.GEOCODIO_API_KEY;
//test zip code
const zip_code = 74011;

//GET Geocode API Data
router.get('/', (req, res) => {
  const endpointURL = `https://api.geocod.io/v1.7/geocode?postal_code=${zip_code}&api_key=${API_KEY}`;
  axios
    .get(endpointURL)
    .then((response) => {
      const searchResponse = response.data.results.map((item) => {
        return {
          lat: item.location.lat,
          long: item.location.lng,
        };
      });

      res.send(searchResponse);
      console.log('Geocode API Success:', response.data);
      res.status(200);
    })
    .catch((error) => {
      console.log('Geocode API error:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
