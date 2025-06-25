import React from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import TransportationDetails from './TransportationDetails';

const containerStyle = {
  width: '100%',
  height: '100vh' // Set height to full screen height
};

const center = {
  lat: 6.9271, // Example latitude
  lng: 79.8612 // Example longitude
};

const MapComponent = ({ directions, window, toggleDrawer }) => {
  return (
    <LoadScript googleMapsApiKey={'AIzaSyD9h-BvrhJSzrEaFdoZ6mN2AaEcON3CATA'}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
