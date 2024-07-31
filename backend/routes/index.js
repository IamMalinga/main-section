const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const dataRoutes = require('./dataRoutes');
const weatherRoutes = require('./weatherRoutes')

router.use(userRoutes);
router.use(dataRoutes);
router.use(weatherRoutes);

module.exports = router;
