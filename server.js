require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

// GET
app.get('/data', async (req, res) => {
    try {
        const query = 'SELECT * FROM students';
        const result = await db.query(query);
        // Send the fetched data as a json response
        res.json(result.rows);
    } catch(error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('An error occurred');
    }
});

// POST route to insert new data
app.post('/data', async (req, res) => {
    try {
        // Fetch data
        const { name, year, course_id, department_id } = req.body;

        // Convert to SQL query
        const query = 'INSERT INTO students (name, year, course_id, department_id) VALUES ($1, $2, $3, $4) returning *';
        const values = ["Huda Ayaz", "junior", 1, 4];

        // Execute query
        const results = await db.query(query, values);

        // Post request to express
        res.status(201).json({staus: "success", data: results.rows[0]});
    } catch(error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('An error occurred');
    }
})

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});