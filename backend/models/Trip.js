// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destinations: [{ type: String }],
  numberOfPeople: { type: Number, required: true },
  days: { type: Number, required: true },
  budget: { type: Number, required: true },
});

module.exports = mongoose.model('Trip', tripSchema);
