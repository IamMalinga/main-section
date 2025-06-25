const express = require('express');

const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../../../controllers/services/hotel/roomController.js");

const auth = require('../../../middlewares/requireAuth.js');

const router = express.Router();

//CREATE
router.post("rooms/:hotelid", auth, createRoom);

//UPDATE
router.put("rooms/availability/:id", updateRoomAvailability);
router.put("rooms/:id", auth, updateRoom);
//DELETE
router.delete("rooms/:id/:hotelid", auth, deleteRoom);
//GET

router.get("rooms/:id", getRoom);
//GET ALL

router.get("rooms/", getRooms);

module.exports = router;