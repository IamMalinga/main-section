const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Offer = mongoose.model('Offer', offerSchema);
module.exports = Offer;
