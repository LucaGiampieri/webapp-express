const express = require('express');
const app = express();
const port = process.env.PORT;

// import middelware CORS
const cors = require("cors");

// import del router dei film
const movieRouter = require('./routers/movieRouter');
// import del middelware di gestione errore interno 500
const errorsHandler = require("./middlewares/errorsHandler");
// import del middelware di gestione di rotta inesistente
const notFound = require("./middlewares/notFound");
// import middelware di gestione path img
const imagePath = require("./middlewares/imagePath")

// attivazione middelware per il CORS
app.use(cors({
    origin: 'http://localhost:5173'
}));

// attivazione della cartella public per uso file statici
app.use(express.static('public'));

// registro il body-parser per "applicaztion/json"
app.use(express.json());

// attivazione middelware di gestione path img
app.use(imagePath);

// rotta home APP
app.get('/api', (req, res) => {
    res.send("<h1>Rotta di home della nostra App di film</h1>")
})

// rotte relative al router dei film
app.use('/api/movies', movieRouter);

// registriamo middelware di gestione err 500
app.use(errorsHandler);

// registriamo middelware di gestione rotta inesistente
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})