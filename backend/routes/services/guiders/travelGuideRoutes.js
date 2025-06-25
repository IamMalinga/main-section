const express = require('express');
const { searchGuides, getGuideDetails, bookGuide, addReview, getUserBookings, saveGalleryImages, updateGuideStatus2  } = require('../../../controllers/services/guiders/travelGuideController');
const { registerSupplier, manageBookings, approveBooking, cancelBooking, updateSupplierStatus, getSupplierData, updateGuideStatus } = require('../../../controllers/services/guiders/bookingController');
const Notification = require('../../../models/services/Notification');
const authMiddleware = require('../../../middlewares/requireAuth');
const auth = require('../../../middlewares/requireAuth');

const router = express.Router();

router.patch('/travel-guides/supplier/bookings/:id/guide-status', updateGuideStatus2);

router.get('/travel-guides/bookings', auth, getUserBookings);

// Public routes
router.post('/travel-guides/search', searchGuides);
router.get('/travel-guides/:id', getGuideDetails);

// Protected routes
router.post('/travel-guides/:id/book', authMiddleware, bookGuide);
router.post('/travel-guides/:id/review', authMiddleware, addReview);

// Supplier routes
router.get('/travel-guides/supplier/bookings', authMiddleware, manageBookings);
router.post('/travel-guides/supplier/register', authMiddleware, registerSupplier);
router.patch('/travel-guides/supplier/booking/:bookingId/approve', authMiddleware, approveBooking);
router.patch('/travel-guides/supplier/booking/:bookingId/cancel', authMiddleware, cancelBooking);
router.patch('/travel-guides/supplier/status', authMiddleware, updateSupplierStatus);
router.get('/travel-guides/supplier/data', authMiddleware, getSupplierData);

//Get booking to bucket
router.post('/travel-guides/:id/gallery', authMiddleware, saveGalleryImages);


router.get("/notifications/:userId", async (req, res) => {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.json(notifications);
});



router.post("/notifications/mark-as-read", async (req, res) => {
    const { id } = req.body;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.json({ success: true });
});


module.exports = router;
