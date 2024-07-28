const Offer = require('../models/Offer');
const Destination = require('../models/Destination');
const Accommodation = require('../models/Accommodation');
const Food = require('../models/Food');
const Review = require('../models/Review');

const getOffers = async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
};

const getDestinations = async (req, res) => {
  const destinations = await Destination.find();
  res.json(destinations);
};

const getAccommodations = async (req, res) => {
  const accommodations = await Accommodation.find();
  res.json(accommodations);
};

const getFood = async (req, res) => {
  const food = await Food.find();
  res.json(food);
};

const getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

module.exports = {
  getOffers,
  getDestinations,
  getAccommodations,
  getFood,
  getReviews,
};
