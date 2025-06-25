const express = require('express');
const router = express.Router();
const Event = require('../../../models/services/eventReminder/Event');
const auth = require('../../../middlewares/requireAuth');
const { sendPushNotification } = require('../pushNotification'); // Import the push notification service

// Find nearby events
router.post('/events/nearby', async (req, res) => {
    const { lat, lng, radius = 1 } = req.body;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const events = await Event.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    distanceField: 'distance',
                    maxDistance: radius * 1000,
                    spherical: true,
                },
            },
        ]);

        res.json(events);
    } catch (error) {
        console.error('Error fetching nearby events:', error);
        res.status(500).json({ error: 'Failed to fetch nearby events' });
    }
});

// RSVP to an event
router.post('/events/:id/rsvp', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ error: 'You have already RSVPed to this event' });
        }

        event.attendees.push(req.user._id);
        await event.save();

        // Send push notification to the user
        const messageData = {
            title: `RSVP Confirmation for ${event.name}`,
            body: `You have successfully RSVPed to ${event.name}.`,
        };
        await sendPushNotification([req.user.pushToken], messageData);

        res.status(200).json({ message: 'Successfully RSVPed to the event', event });
    } catch (error) {
        console.error('RSVP Error:', error);
        res.status(500).json({ error: 'Failed to RSVP' });
    }
});


// Add a review with rating update
router.post('/events/:id/review', auth, async (req, res) => {
    const { rating, comment } = req.body;
    if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be between 1 and 5' });

    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        event.reviews.push({ userId: req.user._id, rating, comment });
        await event.save();

        res.status(201).json({ message: 'Review added successfully', event });
    } catch (error) {
        console.error('Review Error:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Mark or unmark event as favorite
router.post('/events/:id/favorite', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        if (event.favorites.includes(req.user._id)) {
            event.favorites.pull(req.user._id);
            await event.save();
            return res.status(200).json({ message: 'Event removed from favorites', event });
        } else {
            event.favorites.push(req.user._id);
            await event.save();
            return res.status(200).json({ message: 'Event added to favorites', event });
        }
    } catch (error) {
        console.error('Favorite Error:', error);
        res.status(500).json({ error: 'Failed to update favorite status' });
    }
});

// Get filtered events with pagination, sorting, and location name support
router.get('/events', async (req, res) => {
    const { type, startDate, endDate, location, searchTerm, sortBy = 'date', page = 1, limit = 10 } = req.query;

    const filters = {};
    if (type) filters.type = type;
    if (startDate && endDate) filters.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (location) filters['location.name'] = new RegExp(location, 'i');
    if (searchTerm) filters.$text = { $search: searchTerm };

    try {
        const events = await Event.find(filters)
            .sort({ [sortBy]: -1 }) // Descending sort
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('reviews.userId', 'name')
            .lean(); // Use lean() for better performance

        res.json({ data: events, page, limit });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

module.exports = router;
