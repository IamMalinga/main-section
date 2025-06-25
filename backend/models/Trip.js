const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, 
  destinations: [{ name: String, position: { lat: Number, lng: Number } }],
  people: { type: Number, required: true },
  friends: [{ type: String }],  
  days: { type: Number, required: true },
  isOptimized: { type: Boolean, default: false},
  isActive: { type: Boolean, default: false},
  budget: { type: String, enum: ['cheap', 'moderate', 'luxury'], required: true },
  services: [String], 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
