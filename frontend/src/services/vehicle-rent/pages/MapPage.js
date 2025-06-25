import React, { useState, useEffect } from 'react';
import {
    APIProvider,
    AdvancedMarker,
    Map,
    useMap,
} from '@vis.gl/react-google-maps';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "AIzaSyDqzGYxZDTRhnYtjZBxRJpFAWHIGh9xcY4";

const MapPage = ({ selectedCenter }) => {
    const [places, setPlaces] = useState([
        {
            id: 1,
            name: "ABC Car Rentals",
            type: "Car",
            position: { lat: 6.9271, lng: 79.8612 },  // Coordinates for Colombo
        },
        {
            id: 2,
            name: "XYZ Bike Rentals",
            type: "Bike",
            position: { lat: 7.2906, lng: 80.6337 },  // Coordinates for Kandy
        },
        // Add more places as needed
    ]);

    useEffect(() => {
        if (selectedCenter) {
            setPlaces((prevPlaces) =>
                prevPlaces.map((place) =>
                    place.id === selectedCenter.id ? selectedCenter : place
                )
            );
        }
    }, [selectedCenter]);

    return (
        <APIProvider
            apiKey={API_KEY}
            solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
        >
            <Map
                mapId={"bf51a910020fa25a"}
                defaultZoom={7}  // Adjusted for a closer zoom to Sri Lanka
                defaultCenter={{ lat: 7.8731, lng: 80.7718 }}  // Coordinates for Sri Lanka
                gestureHandling={"greedy"}
                disableDefaultUI={true}
            >
                {places.map((place) => (
                    <AdvancedMarker
                        key={place.id}
                        position={place.position}
                    />
                ))}
            </Map>
            <MapHandler places={places} />
        </APIProvider>
    );
};

const MapHandler = ({ places }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || places.length === 0 || typeof google === 'undefined') return;

        const bounds = new window.google.maps.LatLngBounds();
        places.forEach(place => {
            bounds.extend(place.position);
        });
        map.fitBounds(bounds);
    }, [map, places]);

    return null;
};

export default MapPage;
