const express = require('express');
const router = express.Router();
const Event = require('../../../models/services/eventReminder-test/Events');


// GET all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Create a new event
router.post('/events', async (req, res) => {
  const { title, content, date, time, venue, image } = req.body;

  if (!title || !content || !date || !time || !venue) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newEvent = new Event({ title, content, date, time, venue, image });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
});

// Delete an event
router.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
});

// Update an event
router.put('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).send('Event not found');
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).send('Server error');
  }
});


module.exports = router;