// importiamo parte di express
const express = require('express');
// utilizziamo parte di express per gestire le rotte
const router = express.Router();

// importiamo relativo controller
const movieController = require('../controllers/movieController');

// rotta di index
router.get('/', movieController.index);

// export rotte
module.exports = router;