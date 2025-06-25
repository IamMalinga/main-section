const mongoose = require('mongoose');
const TravelGuide = require('../../../models/services/guiders/TravelGuide');
const Booking = require('../../../models/services/guiders/Booking');
const Notification = require('../../../models/services/Notification');

const { io } = require('../../../server');


exports.searchGuides = async (req, res) => {
    const { lat, lng, maxDistance = 20, minRating, priceRange, languages } = req.body;

    try {
        const filters = {
            'location.lat': { $gte: lat - 0.1, $lte: lat + 0.1 },
            'location.lng': { $gte: lng - 0.1, $lte: lng + 0.1 },
        };

        if (minRating) filters.rating = { $gte: minRating };
        if (priceRange) filters.pricePerDay = { $gte: priceRange[0], $lte: priceRange[1] };
        if (languages) filters.languages = { $in: languages };

        const guides = await TravelGuide.find(filters).select('-bookings');
        res.status(200).json(guides);
    } catch (error) {
        console.error('Error fetching guides:', error);
        res.status(500).json({ error: 'Failed to fetch guides' });
    }
};


exports.getGuideDetails = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid guide ID' });
        }

        const guide = await TravelGuide.findById(id).populate('reviews.user', 'firstName lastName profilePic');
        if (!guide) return res.status(404).json({ error: 'Guide not found' });

        res.status(200).json(guide);
    } catch (error) {
        console.error('Error fetching guide:', error);
        res.status(500).json({ error: 'Failed to fetch guide' });
    }
};


exports.bookGuide = async (req, res) => {
    const { id } = req.params; // Travel guide ID
    const { startDate, endDate, totalPrice } = req.body;
    const userId = req.user._id; // Logged-in user's ID

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid guide ID' });
        }


        const guide = await TravelGuide.findById(id);
        if (!guide) return res.status(404).json({ error: 'Guide not found' });


        const isAvailable = guide.bookings.every((booking) => {
            return (
                new Date(endDate) < new Date(booking.startDate) ||
                new Date(startDate) > new Date(booking.endDate) ||
                booking.status !== 'confirmed'
            );
        });

        if (!isAvailable) {
            return res.status(400).json({ error: 'Guide is not available for the selected dates' });
        }


        const booking = new Booking({
            userId,
            guideId: id,
            startDate,
            endDate,
            totalPrice,
            status: 'pending',
        });


        await booking.save();

        guide.bookings.push(booking._id);
        await guide.save();


        const notification = new Notification({
            userId: guide.userId, 
            message: `You have received a new booking request.`,
            type: 'booking',
        });

        await notification.save();


        io.to(guide.userId.toString()).emit('notification', {
            message: notification.message,
            type: notification.type,
            bookingId: booking._id,
        });

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Error booking guide:', error);
        res.status(500).json({ error: 'Failed to book guide' });
    }
};



exports.addReview = async (req, res) => {
    const { id } = req.params; // Guide ID
    const { review, rating } = req.body;
    const userId = req.user._id;

    try {
        const booking = await Booking.findOne({ guideId: id, userId });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found for this guide.' });
        }

        
        if (booking.guideStatus !== 'completed') {
            return res.status(400).json({ error: 'You can only review completed bookings.' });
        }

        const guide = await TravelGuide.findById(id);
        if (!guide) {
            return res.status(404).json({ error: 'Guide not found.' });
        }

        guide.reviews.push({ user: userId, review, rating });

        const totalReviews = guide.reviews.length;
        guide.rating = guide.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

        await guide.save();
        res.status(201).json({ message: 'Review added successfully.', guide });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review.' });
    }
};


exports.getUserBookings = async (req, res) => {
    const userId = req.user?._id;

 
    if (!userId) {
        console.error('Error: User ID is missing in the request');
        return res.status(400).json({ error: 'User ID is required' });
    }

    console.log(`User ID found in request: ${userId}`);

    try {
       
        console.log('Attempting to fetch bookings for the user...');
        const bookings = await Booking.find({ userId })
            .populate('guideId', 'name profilePic location bio');
        
 
        if (!bookings || bookings.length === 0) {
            console.warn('No bookings found for the user');
            return res.status(404).json({ error: 'No bookings found for this user.' });
        }

        console.log('Bookings fetched successfully:', bookings);
        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error occurred while fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};


 exports.saveGalleryImages = async (req, res) => {
    const { id } = req.params;
    const { images } = req.body;

    if (!images || !Array.isArray(images)) {
        return res.status(400).json({ error: 'Invalid image data' });
    }

    try {
        const guide = await TravelGuide.findOne({ userId :id });
        if (!guide) {
            return res.status(404).json({ error: 'Guide not found' });
        }

        guide.experienceImages = [...(guide.experienceImages || []), ...images];
        await guide.save();

        res.status(200).json({ message: 'Images saved successfully', images: guide.experienceImages });
    } catch (error) {
        console.error('Error saving images:', error.message);
        res.status(500).json({ error: 'Failed to save images' });
    }
};



exports.updateGuideStatus2 = async (req, res) => {
    try {
        console.log("Received request to update guide status"); 
        const { id } = req.params;
        const { guideStatus } = req.body; 
        
        console.log(`Received parameters - id: ${id}, guideStatus: ${guideStatus}`);


        if (!id || !guideStatus) {
            console.error("Missing parameters: Guide ID or guideStatus is not provided.");
            return res.status(400).json({ error: 'Guide ID and status are required' });
        }

      
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error(`Invalid guide ID: ${id}`);
            return res.status(400).json({ error: 'Invalid guide ID' });
        }

        console.log("Guide ID is valid. Proceeding to update...");


        const booking = await Booking.findByIdAndUpdate(
            { _id: id }, 
            { guideStatus },
            { new: true } 
        );

        console.log("Query executed. Checking if booking exists...");

        
        if (!booking) {
            console.error(`No booking found with ID: ${id}`);
            return res.status(404).json({ error: 'Booking not found' });
        }

        console.log(`Booking found and updated successfully: ${JSON.stringify(booking)}`);
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error updating guide status:", error); 
        res.status(500).json({ error: 'Failed to update guide status xxxx' });
    }
};




