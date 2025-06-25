const express = require('express');
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
  getHotelsByLocation,
} = require('../../../controllers/services/hotel-test/hotelController');
const requireAuth = require('../../../middlewares/requireAuth');

const router = express.Router();

// CREATE
router.post('/hotels', requireAuth, createHotel);

// UPDATE
router.put('/hotels/:id', requireAuth, updateHotel);

// DELETE
router.delete('/hotels/:id', requireAuth, deleteHotel);

// GET
router.get('/hotels/find/:id', getHotel);

// GET ALL
router.get('/hotels', getHotels);
router.get('/hotels/countByCity', countByCity);
router.get('/hotels/countByType', countByType);
router.get('/hotels/room/:id', getHotelRooms);

// ADD THIS: GET hotels by location (city)
router.get('/hotels/search', getHotelsByLocation);

module.exports = router;