const Trip = require('../models/Trip');
const { v4: uuidv4 } = require('uuid');



const createTrip = async (req, res) => {
  const { id, destinations, people, friends, days, budget, services, isOptimized, travelWith } = req.body;

  console.log("Received trip data:", req.body);

  if (!req.user || !req.user._id) {
    console.error('User not authenticated');
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    await Trip.updateMany({ user: req.user._id }, { isActive: false });
    console.log("Deactivated all existing trips for the user.");

    const tripData = {
      id: id || uuidv4(), 
      destinations,
      people,
      friends,
      days,
      budget,
      services,
      travelWith,
      isActive: true, 
      user: req.user._id, 
    };


    const trip = await Trip.create(tripData);
    console.log("Trip saved successfully:", trip);

    return res.status(201).json(trip);
  } catch (error) {

    if (error.code === 11000 && error.keyPattern?.id) {
      console.error("Duplicate trip ID detected. Retrying with a new ID.");
      try {
      
        const retryTripData = {
          ...req.body,
          id: uuidv4(), 
          isActive: true, 
          user: req.user._id,
        };
        delete retryTripData._id; 

        const newTrip = await Trip.create(retryTripData);
        console.log("Trip saved successfully after retry:", newTrip);

        return res.status(201).json(newTrip);
      } catch (retryError) {
        console.error("Failed to save trip after retrying:", retryError);
        return res.status(500).json({ error: 'Failed to save trip after retrying.' });
      }
    }

    console.error("Error saving trip:", error);
    return res.status(500).json({ error: 'Failed to save trip.' });
  }
};



const getUserTrips = async (req, res) => {
    try {
      const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: 1 });
      res.status(200).json(trips);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const getRecentServices = async (req, res) => {
    try {
      const services = await Trip.find({ user: req.user._id })
        .sort({ updatedAt: -1 })
        .limit(5)
        .select('services');
      res.status(200).json(services);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const getUserNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const getSuggestions = async (req, res) => {
  
    const suggestions = [
      { name: 'Beautiful Beach', position: { lat: 7.8731, lng: 80.7718 } },
      { name: 'Mountain View', position: { lat: 8.1234, lng: 81.1234 } },
    ];
  
    res.status(200).json(suggestions);
  };

  const activateTrip = async (req, res) => {
    const { tripId } = req.params;
    const userId = req.user._id;
  
    try {
      await Trip.updateMany({ user: userId, isActive: true }, { $set: { isActive: false } });
  
      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: tripId, user: userId },
        { $set: { isActive: true } },
        { new: true }
      );
  
      if (!updatedTrip) {
        return res.status(404).json({ error: 'Trip not found or not authorized' });
      }
  
      res.status(200).json(updatedTrip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to activate trip' });
    }
  };


  const getActiveTrip = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const activeTrip = await Trip.findOne({ user: userId, isActive: true });
      if (!activeTrip) {
        return res.status(404).json({ error: "No active trip found" });
      }
  
      res.status(200).json(activeTrip);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve active trip" });
    }
  };


  const saveOptimizedTrip = async (req, res) => {
    const { tripId, optimizedDestinations, isOptimized } = req.body;

    if (!tripId || !optimizedDestinations) {
        return res.status(400).json({ error: 'Trip ID and optimized destinations are required' });
    }

    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { id: tripId },
            {
                $set: {
                    destinations: optimizedDestinations,
                    isOptimized,
                    updatedAt: new Date(), 
                },
            },
            { new: true } 
        );

        if (!updatedTrip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.status(200).json({ message: 'Trip updated successfully', trip: updatedTrip });
    } catch (error) {
        console.error('Error updating trip:', error);
        res.status(500).json({ error: 'Failed to update trip' });
    }
}

const places = async (req, res) => {
  const { query } = req.query;

  if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
      const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );

      if (!response.ok) {
          throw new Error(`Google API responded with status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data); 
      console.log(data);
  } catch (error) {
      console.error('Error fetching place details:', error.message);
      res.status(500).json({ error: 'Failed to fetch place details' });
  }
}

const bestRoute = async (req, res) => {
    try {
        const { origin, destinations } = req.body;

        const waypoints = destinations.slice(0, -1).join('|'); 
        const destination = destinations[destinations.length - 1];

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Error fetching directions:', error);
        res.status(500).json({ error: 'Failed to fetch directions' });
    }
}

const getRouteDataUsingId = async (req, res) => {
    const { tripId } = req.body;

    if (!tripId) {
        return res.status(400).json({ error: 'Trip ID is required' });
    }

    try {
        // Find the trip in the database by ID
        const trip = await Trip.findOne({id: tripId});

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        // Return the destinations and other necessary fields
        res.status(200).json({
            destinations: trip.destinations,
            people: trip.people,
            days: trip.days,
            budget: trip.budget,
        });
    } catch (error) {
        console.error('Error fetching trip data:', error.message);
        res.status(500).json({ error: 'Failed to fetch trip data' });
    }
}
  

module.exports = { createTrip, getUserTrips, getRecentServices, getUserNotifications, getSuggestions, activateTrip, getActiveTrip, saveOptimizedTrip, places, bestRoute, getRouteDataUsingId };
