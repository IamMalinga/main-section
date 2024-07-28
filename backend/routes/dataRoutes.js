const express = require('express');
const router = express.Router();
const {
  getOffers,
  getDestinations,
  getAccommodations,
  getFood,
  getReviews,
} = require('../controllers/dataController');

router.get('/offers', getOffers);
router.get('/destinations', getDestinations);
router.get('/accommodations', getAccommodations);
router.get('/food', getFood);
router.get('/reviews', getReviews);

module.exports = router;
