const express = require('express');
const { createTrip, getUserTrips, getRecentServices, getUserNotifications, getSuggestions, activateTrip, getActiveTrip, saveOptimizedTrip, places, bestRoute, getRouteDataUsingId } = require('../../controllers/tripController');
const auth = require('../../middlewares/requireAuth');
const router = express.Router();


router.get('/trips', auth, getUserTrips);
router.post('/trips', auth, createTrip);
router.get('/services/recent', auth, getRecentServices);
router.get('/notifications', auth, getUserNotifications);
router.get('/suggestions', auth, getSuggestions);


//[S/19/146]
router.post('/trips/save-optimized-route', saveOptimizedTrip);
router.put('/trips/activate/:tripId', auth, activateTrip);
router.get('/trips/active', auth, getActiveTrip);
router.get('/trip/places', places);
router.post('/trip/directions/best_route',bestRoute );
router.post('/trips/get-route-data-using-id', getRouteDataUsingId);



module.exports = router;


