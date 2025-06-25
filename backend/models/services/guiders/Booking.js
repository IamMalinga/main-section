const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'TravelGuide', required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
        guideStatus: { 
            type: String, 
            enum: ['pending', 'started', 'ongoing', 'completed'], 
            default: 'pending' 
        },
        totalPrice: { type: Number, required: true },
        paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
        transactionId: { type: String }, // For payment integration
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
