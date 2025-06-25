const express = require('express');
const router = express.Router();

const userRoutes = require('./main/userRoutes');
const testimonialRoutes = require('./main/testimonialRoutes');
const tripRoutes = require('./main/tripRoutes');
const recentServiceRoutes = require('./main/recentServiceRoutes');
const chatRoutes = require('./services/chat/chatRoutes')
const postRoutes = require('./services/chat/postRoutes')
const hotelRoutes = require('./services/hotel-test/hotelRoutes')
const roomRoutes = require('./services/hotel-test/roomRoutes')
const shortRoutes = require('./services/chat/shortRoutes')
const travelGuideRoutes = require('./services/guiders/travelGuideRoutes');
const bookingRoutes = require('./services/guiders/bookingRoutes')
const eventRoutes = require('./services/eventReminder-test/eventRoutes')
const openChatRoutes = require('./services/chat/openChatRoutes');


router.use(tripRoutes);
router.use(testimonialRoutes);
router.use(userRoutes);
router.use(recentServiceRoutes);
router.use(chatRoutes);
router.use(postRoutes);
router.use(hotelRoutes);
router.use(roomRoutes);
router.use(shortRoutes);

router.use(bookingRoutes);
router.use(eventRoutes);
router.use(travelGuideRoutes);

router.use(openChatRoutes)

module.exports = router;
