const express = require('express');
const router = express.Router();
const { createShort, getShorts } = require('../../../controllers/services/chat/shortController');
const auth = require('../../../middlewares/requireAuth');

router.get('/shorts', auth, getShorts);
router.post('/shorts', auth, createShort);

module.exports = router;
