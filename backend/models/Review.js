// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
  rating: Number,
  role: String,
});

module.exports = mongoose.model('Review', reviewSchema);
