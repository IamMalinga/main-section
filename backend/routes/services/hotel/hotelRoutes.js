const express = require('express');

const {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} = require("../../../controllers/services/hotel/hotelController.js");

const auth = require('../../../middlewares/requireAuth.js')

const router = express.Router();

//CREATE
router.post("hotels/", auth, createHotel);

//UPDATE
router.put("hotels/:id", auth, updateHotel);
//DELETE
router.delete("hotels/:id", auth, deleteHotel);
//GET

router.get("hotels/find/:id", getHotel);
//GET ALL

router.get("hotels/", getHotels);
router.get("hotels/countByCity", countByCity);
router.get("hotels/countByType", countByType);
router.get("hotels/room/:id", getHotelRooms);

module.exports = router;