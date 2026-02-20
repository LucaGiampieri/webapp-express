// importiamo la connessione del DB
const connection = require('../data/db');

// funzione di index
function index(req, res) {

    // prepariamo la query
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });

}

// export controller
module.exports = { index }