// Importing the 'express' library to create our server and handle HTTP requests.
const express = require('express');
// Import the database connection
const db = require('../db');
// Import the storage connection
const upload = require('../storage');
// Create a new router instance from express to handle routes (specific paths for API requests).
const router = express.Router();

// Get all dogs
router.get('/', (req, res) => {
    const sql = 'SELECT dogs.*, categories.name AS category FROM dogs JOIN categories ON dogs.category_id = categories.id';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get a single dog
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM dogs WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result[0]);
    });
});

// Add a new dog
router.post('/', upload.single('image'), (req, res) => {
    const { name, breed, age, category_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const sql = 'INSERT INTO dogs (name, breed, age, image, category_id) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, breed, age, image, category_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

// Update a dog
router.put('/:id', upload.single('image'), (req, res) => {
    const { name, breed, age, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    // If there's a new image, update the image field
    let sql = 'UPDATE dogs SET name = ?, breed = ?, age = ?, category_id = ?';
    
    // If there's a new image, append it to the update query
    if (image) {
        sql += ', image = ?';
    }
    sql += ' WHERE id = ?';

    const values = [name, breed, age, category_id];
    if (image) {
        values.push(image);
    }
    values.push(req.params.id);

    db.query(sql, values, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update dog' });

        // Send a proper JSON response instead of just 'OK'
        res.status(200).json({ message: 'Dog updated successfully' });
    });
});


// Delete a dog
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM dogs WHERE id = ?';
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

module.exports = router;