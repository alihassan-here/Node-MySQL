const express = require('express');
const app = express();
const mysqli = require('mysql');


const PORT = process.env.port || 5000;
app.use(express.json());

const pool = mysqli.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_beers'
});

// GET ALL BEERS
app.get('/beers', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            connection.query('SELECT * FROM beers', (err, results) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(results);
                }
            });
        }
    });
    // let query = 'SELECT * FROM beers';
    // pool.query(query, (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         res.status(200).send(results);
    //     }
    // });
});

// GET ONE BEER
app.get('/beers/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            connection.query('SELECT * FROM beers WHERE id = ?', [req.params.id], (err, results) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(results);
                }
            });
        }
    });
    // let id = req.params.id;
    // let query = 'SELECT * FROM beers WHERE id = ?';
    // pool.query(query, [id], (err, results) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         res.status(200).send(results);
    //     }
    // });
});

//Delete beer
app.delete('/beers/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, results) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        message: `Beer with id ${req.params.id} has been deleted`
                    });
                }
            });
        }
    });
});

//Create beer
app.post('/beers', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            connection.query('INSERT INTO beers SET ?', req.body, (err, results) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        message: `Beer with name ${results.name} has been created`
                    });
                }
            });
        }
    });
});

//Update beer
app.put('/beers/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            connection.query('UPDATE beers SET ? WHERE id = ?', [req.body, req.params.id], (err, results) => {
                connection.release();
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        message: `Beer with id ${req.params.id} has been updated`
                    });
                }
            });
        }
    });
});





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});