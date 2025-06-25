// components/EventReminder.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import EventMap from './EventMap';
import CreateEvent from './CreateEvent';
import EventList from './EventList';
import { TripContext } from '../../context/TripContext';

const EventReminder = () => {
    const [openCreateEvent, setOpenCreateEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const { tripData } = useContext(TripContext);

    const handleOpenCreateEvent = () => setOpenCreateEvent(true);
    const handleCloseCreateEvent = () => setOpenCreateEvent(false);
    const handleSelectEvent = (event) => setSelectedEvent(event);

    useEffect(() => {
        const fetchEvents = async () => {
            if (!tripData || !tripData.destinations || tripData.destinations.length === 0) {
                console.error("No trip destination data found.");
                return;
            }

            const destination = tripData.destinations[0];
            const { lat, lng } = destination.position;

            try {
                const response = await fetch('/api/events/nearby', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ lat, lng, radius: 1 }), // Radius in km
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const data = await response.json();
                setEvents(data); // Update state with fetched events
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, [tripData]);

    return (
        <Container>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Event Reminder
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOpenCreateEvent}>
                        Create New Event
                    </Button>
                </Box>
            </Box>

            {/* Display EventMap and EventList */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <EventList events={events} onSelectEvent={handleSelectEvent} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <EventMap events={events} onSelectEvent={handleSelectEvent} />
                </Box>
            </Box>

            <CreateEvent open={openCreateEvent} onClose={handleCloseCreateEvent} />
        </Container>
    );
};

export default EventReminder;
