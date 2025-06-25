// components/EventList.js
import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const EventList = ({ events, onSelectEvent }) => (
    <Box>
        {events.length > 0 ? (
            events.map((event) => (
                <Card
                    key={event._id}
                    sx={{ marginBottom: 2, cursor: 'pointer' }}
                    onClick={() => onSelectEvent(event)}
                >
                    <CardContent>
                        <Typography variant="h5">{event.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {event.description}
                        </Typography>
                        <Typography variant="body1" sx={{ marginTop: 1 }}>
                            Location: {event.location.name}
                        </Typography>
                        <Typography variant="body1">
                            Date: {new Date(event.date).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            ))
        ) : (
            <Typography variant="body1" color="textSecondary" align="center">
                No events found for this location.
            </Typography>
        )}
    </Box>
);

export default EventList;
