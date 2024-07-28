// seed.js
const mongoose = require('mongoose');
const Review = require('./models/Review');

mongoose.connect('mongodb+srv://group_11:12345mdb@cluster0.ihxkq.mongodb.net/travelPlanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviews = [
  {
    name: 'Lydia Yang',
    comment: 'So much easier to visualize and plan a road trip to my favorite rock climbing destinations and explore the area around.',
    rating: 5,
    role: 'Founder',
  },
  {
    name: 'Nadia',
    comment: 'Planning your trip by having all the attractions already plugged into a map makes trip planning so much easier.',
    rating: 5,
    role: 'Travel Blogger',
  },
  {
    name: 'Kelvin S.',
    comment: 'Yesterday I walked my kids through the vacation timeline that I\'ve built so far and their excitement levels went way up!',
    rating: 5,
  },
  {
    name: 'Josh M.',
    comment: 'I\'m a rather extensive planner when I take trips so this was great. I liked how it auto-filled all of my travel information from my email account.',
    rating: 5,
  },
];

Review.insertMany(reviews)
  .then(() => {
    console.log('Reviews added');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
    mongoose.connection.close();
  });
