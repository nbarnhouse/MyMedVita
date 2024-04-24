const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//get codes and descriptions to suggest to user as they type in search bar
router.get('/:query', async (req,res) => {
    try{
        const  query = req.params.query; //get search query from request(what the user is typing)

        const client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM service_codes WHERE CAST(primary_code AS TEXT) ILIKE $1 OR description ILIKE $1`,
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

module.exports = router;