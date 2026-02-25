// importiamo parte di express
const express = require('express');
// utilizziamo parte di express per gestire le rotte
const router = express.Router();

// importiamo relativo controller
const movieController = require('../controllers/movieController');

// rotta di index
router.get('/', movieController.index);

// rotta di show
router.get('/:id', movieController.show);

// rotta di create recensione
router.post('/:id/reviews', movieController.storeReview);

// export rotte
module.exports = router;