import React, { useState } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Select from 'react-select';
import axios from 'axios';
import L from 'leaflet';

// Import the default marker icon from Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const opencageApiKey = 'a94410adcdeb4436b201af4b721c08d4'; // Your OpenCage API key

const DestinationStep = ({ tripData, updateTripData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleSearch = async (inputValue) => {
    if (!inputValue) return;
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(inputValue)}&key=${opencageApiKey}`);
      if (response.data.results) {
        const suggestions = response.data.results.map((result) => ({
          label: result.formatted,
          value: result.geometry
        }));
        setSuggestions(suggestions);
      } else {
        console.error('No results found');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (inputValue) => {
    handleSearch(inputValue);
  };

  const handleAddDestination = () => {
    if (!selectedSuggestion) return;
    const newDestinations = [...tripData.destinations, { name: selectedSuggestion.label, position: selectedSuggestion.value, id: Date.now() }];
    updateTripData({ destinations: newDestinations });
    setSelectedSuggestion(null);
    setSuggestions([]);
  };

  const handleRemoveDestination = (id) => {
    const newDestinations = tripData.destinations.filter((dest) => dest.id !== id);
    updateTripData({ destinations: newDestinations });
  };

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <Box display="flex" flexDirection="row" p={2} sx={{ mt: '64px' }}>
      <Box width="50%" sx={{ paddingRight: '16px' }}>
        <Typography variant="h5">Add Destinations</Typography>
        <Select
          value={selectedSuggestion}
          onInputChange={handleInputChange}
          onChange={setSelectedSuggestion}
          options={suggestions}
          placeholder="Type to search for a destination"
          isClearable
        />
        <Button variant="contained" color="primary" onClick={handleAddDestination} sx={{ mt: 2 }}>
          Add Destination
        </Button>
        <List>
          {tripData.destinations.map((dest) => (
            <ListItem key={dest.id} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveDestination(dest.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={dest.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box width="50%">
        <MapContainer center={[6.9271, 79.8612]} zoom={8} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {tripData.destinations.map((dest, index) => (
            <Marker key={index} position={[dest.position.lat, dest.position.lng]} icon={customIcon}>
              <Popup>{dest.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default DestinationStep;
