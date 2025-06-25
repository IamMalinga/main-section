const express = require('express');
const { addRecentService, getRecentServices } = require('../../controllers/recentServiceController');
const auth = require('../../middlewares/requireAuth');

const router = express.Router();


router.post('/recent-service', auth, addRecentService);
router.get('/recent-services', auth, getRecentServices);

module.exports = router;