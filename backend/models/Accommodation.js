const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
module.exports = Accommodation;
