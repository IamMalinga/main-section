const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Booking = require('../../../models/services/guiders/Booking');
const TravelGuide = require('../../../models/services/guiders/TravelGuide');
const auth = require('../../../middlewares/requireAuth');


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


router.get('/travel-guides/my-bookings', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('guideId', 'name location profilePic pricePerDay');
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});


router.delete('/travel-guides/my-bookings/:id', auth, async (req, res) => {
    const bookingId = req.params.id;

    if (!isValidObjectId(bookingId)) {
        return res.status(400).json({ error: 'Invalid booking ID' });
    }

    try {
        const booking = await Booking.findOneAndDelete({ _id: bookingId, userId: req.user._id });
        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        const guide = await TravelGuide.findById(booking.guideId);
        if (guide) {
            guide.bookings = guide.bookings.filter(b => !b._id.equals(booking._id));
            guide.availability.availableDates.push(...getDateRange(new Date(booking.startDate), new Date(booking.endDate)));
            await guide.save();
        }

        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
});


const getDateRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};


router.put('/travel-guides/:id/confirm-booking', auth, async (req, res) => {
    const bookingId = req.params.id;
    const { transactionId } = req.body;

    if (!isValidObjectId(bookingId)) {
        return res.status(400).json({ error: 'Invalid booking ID' });
    }

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        if (booking.status === 'confirmed') {
            return res.status(400).json({ error: 'Booking is already confirmed' });
        }

        booking.status = 'confirmed';
        booking.paymentStatus = 'paid';
        booking.transactionId = transactionId;
        await booking.save();

        const guide = await TravelGuide.findById(booking.guideId);
        if (guide) {
            guide.earnings += booking.totalPrice;
            await guide.save();
        }

        res.status(200).json({ message: 'Booking confirmed and payment received.' });
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ error: 'Failed to confirm booking' });
    }
});

module.exports = router;
