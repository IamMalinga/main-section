const TravelGuide = require('../../../models/services/guiders/TravelGuide');
const Booking = require('../../../models/services/guiders/Booking');
const Notification = require('../../../models/services/Notification');


let io;

exports.initializeSocket = (socketInstance) => {
    io = socketInstance;
};




exports.registerSupplier = async (req, res) => {
    const { name, location, bio, contact, pricePerDay, profilePic, experienceYears, languages, specialties } = req.body;
    const userId = req.user._id;

    try {
        const existingSupplier = await TravelGuide.findOne({ userId });
        if (existingSupplier) return res.status(400).json({ error: 'You are already a supplier' });

        const supplier = new TravelGuide({
            userId,
            name,
            location,
            bio,
            contact,
            pricePerDay,
            profilePic,
            experienceYears,
            languages,
            specialties,
        });

        await supplier.save();
        res.status(201).json({ message: 'Supplier registered successfully', supplier });
    } catch (error) {
        console.error('Error registering supplier:', error);
        res.status(500).json({ error: 'Failed to register as a supplier' });
    }
};


exports.manageBookings = async (req, res) => {
    const userId = req.user._id;

    try {
        const supplier = await TravelGuide.findOne({ userId: userId });
        if (!supplier) {
            console.error('Supplier not found');
            return res.status(404).json({ error: 'Supplier not found' });
        }

        const bookings = await Booking.find({ guideId: supplier._id })
            .populate('userId', 'firstName lastName profilePic email');

        res.status(200).json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};



exports.approveBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        console.log('Booking Approval Requested for:', bookingId.toString());

        const booking = await Booking.findById(bookingId.toString()).populate('userId', 'email');
        if (!booking) {
            console.error('Booking not found:', bookingId.toString());
            return res.status(404).json({ error: 'Booking not found' });
        }

        console.log('Booking found. Updating status to confirmed...');
        booking.status = 'confirmed';
        await booking.save();

        console.log('Booking status updated. Saving notification...');
        const notification = new Notification({
            userId: booking.userId._id.toString(),
            message: `Your booking has been approved by the guide.`,
            type: 'approval',
        });
        await notification.save();

        console.log('Notification saved. Emitting real-time event...');
        console.log("Emitting to room:", booking.userId._id.toString(), {
            message: notification.message,
          });
          
        io.to(booking.userId._id.toString()).emit('notification', {
            message: notification.message,
            type: notification.type,
            bookingId: booking._id.toString(),
        });

        console.log('Real-time notification sent.');
        res.status(200).json({ message: 'Booking approved successfully', booking });
    } catch (error) {
        console.error('Error approving booking:', error);
        res.status(500).json({ error: 'Failed to approve booking' });
    }
};



exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ error: 'Booking not found' });

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully', booking });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};



exports.updateSupplierStatus = async (req, res) => {
    const userId = req.user._id;

    try {
        const supplier = await TravelGuide.findOne({ userId });
        if (!supplier) {
            return res.status(404).json({ error: 'Supplier not found' });
        }

        supplier.supplierStatus = supplier.supplierStatus === 'active' ? 'inactive' : 'active';
        await supplier.save();

        res.status(200).json({ message: 'Supplier status updated successfully', supplier });
    } catch (error) {
        console.error('Error updating supplier status:', error);
        res.status(500).json({ error: 'Failed to update supplier status' });
    }
};


exports.getSupplierData = async (req, res) => {
    const userId = req.user._id;

    try {
        const supplier = await TravelGuide.findOne({ userId });
        if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

        res.status(200).json(supplier);
    } catch (error) {
        console.error('Error fetching supplier data:', error);
        res.status(500).json({ error: 'Failed to fetch supplier data' });
    }
};


exports.updateGuideStatus = async (req, res) => {
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
        console.error("Error updating guide status:", error); // Log the exact error
        res.status(500).json({ error: 'Failed to update guide status xxxx' });
    }
};
