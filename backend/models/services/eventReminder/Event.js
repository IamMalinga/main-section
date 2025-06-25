const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        name: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
            index: '2dsphere',
        },
    },
    date: { type: Date, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    type: { type: String, required: true, enum: ['Party', 'Music', 'Culture', 'Sports', 'Outdoor', 'Education'] },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    reviews: [reviewSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

eventSchema.virtual('averageRating').get(function () {
    if (this.reviews.length === 0) return 0;
    const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / this.reviews.length).toFixed(1);
});

eventSchema.pre('save', function (next) {
    if (this.location && this.location.lat && this.location.lng) {
        this.location.coordinates = [this.location.lng, this.location.lat];
    }
    next();
});

module.exports = mongoose.model('Event', eventSchema);
