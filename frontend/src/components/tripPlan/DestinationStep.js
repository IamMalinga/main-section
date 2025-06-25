import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { GoogleMap, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

const libraries = ["places"];

const DestinationStep = ({ tripData, updateTripData }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Ensure tripData.destinations is always an array
  const destinations = [];

  const onLoad = useCallback((autoC) => setAutocomplete(autoC), []);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newLocation = {
          name: place.formatted_address,
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          id: Date.now(),
        };
        setSelectedLocation(newLocation);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleAddDestination = () => {
    if (!selectedLocation) return;
    const newDestinations = [...destinations, selectedLocation];
    updateTripData({ destinations: newDestinations });
    setSelectedLocation(null);
  };

  const handleRemoveDestination = (id) => {
    const newDestinations = destinations.filter((dest) => dest.id !== id);
    updateTripData({ destinations: newDestinations });
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleMapClick = (event) => {
    const newLocation = {
      name: 'New Destination',
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      id: Date.now(),
    };
    setSelectedLocation(newLocation);
  };

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              padding: 3,
              borderRadius: 4,
              backgroundColor: '#fff',
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{ mb: 3, fontWeight: 'bold' }}
            >
              Add Destinations
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                type="text"
                placeholder="Type to search for a destination"
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '10px',
                  borderRadius: '8px',
                  borderColor: '#1976D2',
                }}
              />
            </Autocomplete>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddDestination}
              sx={{
                mt: 3,
                borderRadius: 8,
                padding: '10px 20px',
                textTransform: 'none',
                fontWeight: 'bold',
              }}
              disabled={!selectedLocation}
            >
              Add Destination
            </Button>
            <List sx={{ mt: 3 }}>
              {destinations.map((dest) => (
                <ListItem
                  key={dest.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveDestination(dest.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    borderRadius: 3,
                    mb: 2,
                    padding: 2,
                    backgroundColor: '#f4f6f8',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    },
                  }}
                >
                  <ListItemText primary={dest.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '600px',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              zoom={8}
              center={{ lat: 7.8731, lng: 80.7718 }}
              options={{
                fullscreenControl: false,
                mapTypeControl: false,
                streetViewControl: false,
              }}
              onClick={handleMapClick}
            >
              {destinations.map((dest) => (
                <Marker
                  key={dest.id}
                  position={dest.position}
                  onClick={() => handleActiveMarker(dest.id)}
                  icon={{
                    url: '/path/to/custom-marker-icon.png',
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                >
                  {activeMarker === dest.id && (
                    <InfoWindow
                      position={dest.position}
                      onCloseClick={() => setActiveMarker(null)}
                    >
                      <div>{dest.name}</div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
              {selectedLocation && (
                <Marker
                  position={selectedLocation.position}
                  onClick={() => handleActiveMarker(selectedLocation.id)}
                  icon={{
                    url: '/path/to/custom-marker-icon.png',
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                >
                  <InfoWindow
                    position={selectedLocation.position}
                    onCloseClick={() => setActiveMarker(null)}
                  >
                    <div>{selectedLocation.name}</div>
                  </InfoWindow>
                </Marker>
              )}
            </GoogleMap>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DestinationStep;
