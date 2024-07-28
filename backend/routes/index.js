const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const dataRoutes = require('./dataRoutes');

router.use(userRoutes);
router.use(dataRoutes);

module.exports = router;
