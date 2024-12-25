const express = require('express');
const router = express.Router();
const client = require('../db');
const Quote = require('inspirational-quotes');
const t_Morningtalk = 'public.morningtalk';
// GET Route
router.get('/get/:year/:month', (req, res) => {
    var dataAll;
    const queryAll = `SELECT * FROM ${t_Morningtalk}`;
    client.query(queryAll, [])
    .then(result => {
        console.log('Query result:', result['rows']);
        dataAll = result.rows;
    });

    const { year, month } = req.params;
    const datePattern = `__/${month}/${year}`;
    const query = `SELECT * FROM ${t_Morningtalk} WHERE date LIKE $1`;

    client.query(query, [datePattern], (err, result) => {
        if (err) {
            console.error('Error in query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send({ data: result.rows, dataAll: dataAll });
        }
    });
});

// POST Route
router.post(`/save`, async (req, res) => {
    const data = req.body;

    try {
        const promises = data.flatMap((d) =>
            d.data.map(async (p) => {
                const checkQuery = `SELECT * FROM ${t_Morningtalk} WHERE name = $1 AND date = $2`;
                const checkValues = [p.name, d.date];
                const existingRecord = await client.query(checkQuery, checkValues);

                if (existingRecord.rowCount > 0) {
                    const updateQuery = `UPDATE ${t_Morningtalk} 
                                        SET detail = $3, problem = $4 
                                        WHERE name = $1 AND date = $2 RETURNING *;`;
                    const updateValues = [p.name, d.date, p.detail, p.problem];
                    return client.query(updateQuery, updateValues);
                } else {
                    const insertQuery = `INSERT INTO ${t_Morningtalk} (name, date, detail, problem)
                                        VALUES ($1, $2, $3, $4) RETURNING *;`;
                    const insertValues = [p.name, d.date, p.detail, p.problem];
                    return client.query(insertQuery, insertValues);
                }
            })
        );

        await Promise.all(promises);
        res.status(201).send(true);
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('Error saving data');
    }
});

module.exports = router;