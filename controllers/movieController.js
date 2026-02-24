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

        // creo una copia dei risultati con modifica path imgs
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);
    });
}

// funzione di show
function show(req, res) {

    // recuperiamo id da param dinamico
    const { id } = req.params;

    // prepariamo le query per le richieste

    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    // chiamata a DB principale per recuperare i film
    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // salviamo il risultato in una cost
        const movie = movieResults[0];

        // creo una copia dei risultati con modifica path imgs
        const newMovie = {
            ...movie,
            image: req.imagePath + movie.image
        };

        // chiamata a DB secondaria per recupero reviews dei film
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // saviamo le reviews in una cost
            const reviewsArr = reviewsResults;

            // aggiungiamo a oggetto movie la prop per le reviews
            newMovie.reviews = reviewsArr;

            // ritorniamo il json del film
            res.json(newMovie);
        });
    });
}




// export controller
module.exports = { index, show }