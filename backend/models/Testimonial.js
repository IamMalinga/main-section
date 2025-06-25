// models/Testimonial.js
const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    profilePic: { type: String }, // Link to user's profile picture
    name: { type: String, required: true },
    role: { type: String, required: true }, // Job or role
    feedback: { type: String, required: true },
    category: {
      type: String,
      enum: ['App', 'Travel Guiders', 'Open Chat', 'Services'],
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
