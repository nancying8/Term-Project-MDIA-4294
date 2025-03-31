// Importing the 'express' library to create our server and handle HTTP requests.
const express = require('express');
// Import the database connection
const db = require('../db'); 
// Create a new router instance from express to handle routes (specific paths for API requests).
const router = express.Router();

// Get all categories
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

module.exports = router;