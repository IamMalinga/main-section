// components/EventMap.js
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const EventMap = ({ events, onSelectEvent }) => (
    <GoogleMap
        center={{ lat: 6.0328948, lng: 80.2167912 }} // Default center point
        zoom={12}
        mapContainerStyle={{ height: '600px', width: '100%' }}
    >
        {events.map((event) => (
            <Marker
                key={event._id}
                position={{ lat: event.location.lat, lng: event.location.lng }}
                onClick={() => onSelectEvent(event)}
            />
        ))}
    </GoogleMap>
);

export default EventMap;
