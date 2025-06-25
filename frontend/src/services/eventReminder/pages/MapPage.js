// frontend/src/services/open-chat/pages/MapPage.js
import React, { useState, useEffect } from "react";
import {
    AdvancedMarker,
    Map,
    useMap,
} from "@vis.gl/react-google-maps";
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";

const MapPage = ({ onSelectLocation }) => {
    const [places, setPlaces] = useState([]); 
    const { user } = useAuthContext(); 

    // Fetch posts with location data from the backend
    useEffect(() => {
        const fetchPostsWithLocations = async () => {
            try {
                const response = await fetch('/api/posts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    console.error("Failed to fetch posts with locations");
                    return;
                }

                const data = await response.json();
                
                // Extract only posts with valid locations
                const postLocations = data
                    .filter(post => post.location && post.location.lat && post.location.lng)
                    .map(post => ({
                        id: post._id,
                        name: post.content || "Post Location",
                        position: { lat: post.location.lat, lng: post.location.lng },
                    }));

                setPlaces(postLocations);
            } catch (error) {
                console.error("Error fetching post locations:", error);
            }
        };

        if (user?.token) {
            fetchPostsWithLocations();
        }
    }, [user]);

    const handleMapClick = (event) => {
        const newLocation = {
            id: `temp-${places.length + 1}`,
            name: `New Place ${places.length + 1}`,
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() }
        };
        setPlaces([...places, newLocation]);
        if (onSelectLocation) onSelectLocation(newLocation);
    };

    return (
        <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={7}
            defaultCenter={{ lat: 7.8731, lng: 80.7718 }}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            onClick={handleMapClick} 
        >
            {places.map((place) => (
                <AdvancedMarker
                    key={place.id}
                    position={place.position}
                />
            ))}
            <MapHandler places={places} />
        </Map>
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
