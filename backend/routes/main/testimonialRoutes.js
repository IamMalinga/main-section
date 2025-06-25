// routes/testimonialRoutes.js
const express = require('express');
const Testimonial = require('../../models/Testimonial');
const User = require('../../models/User');
const auth = require('../../middlewares/requireAuth');
const router = express.Router();


router.get('/users/testimonials', async (req, res) => {
    try {

      const testimonials = await Testimonial.find()
        .sort({ createdAt: -1 }) 
        .limit(3)
        .populate('userId', 'firstName lastName profilePic role');
  

      const response = testimonials.map((testimonial) => ({
        id: testimonial._id,
        feedback: testimonial.feedback,
        category: testimonial.category,
        rating: testimonial.rating,
        createdAt: testimonial.createdAt,
        profilePic: testimonial.userId.profilePic || '', 
        name: `${testimonial.userId.firstName} ${testimonial.userId.lastName}`, 
        role: testimonial.userId.role || 'Traveler', 
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error retrieving testimonials:', error);
      res.status(500).json({ error: 'Failed to retrieve testimonials.' });
    }
  });
  

// Create a testimonial
router.post('/users/testimonials', auth, async (req, res) => {
    const { feedback, category, rating } = req.body;
  
    try {
      // Fetch user details based on userId from the auth middleware
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found.' });
  
      // Create a testimonial using fetched user details
      const testimonial = await Testimonial.create({
        userId: user._id,
        profilePic: user.profilePic,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role || 'Traveler', // Default role if not specified
        feedback,
        category,
        rating,
      });
  
      res.status(201).json(testimonial);
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ error: 'Failed to create testimonial.' });
    }
  });



// Get testimonials by category
router.get('/users/testimonials/category/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const testimonials = await Testimonial.find({ category });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve testimonials.' });
  }
});

module.exports = router;
