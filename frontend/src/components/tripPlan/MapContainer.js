import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const googleMapsApiKey = 'AIzaSyDqzGYxZDTRhnYtjZBxRJpFAWHIGh9xcY4'; // Your Google Maps API key
const center = { lat: 6.9271, lng: 79.8612 }; // Colombo coordinates

const MapComponent = () => {
    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                zoom={13}
                center={center}
            >
                <Marker position={center}>
                    <InfoWindow>
                        <div>Colombo, Sri Lanka</div>
                    </InfoWindow>
                </Marker>
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
