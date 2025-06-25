import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from '@mui/material';
import { useAuthContext } from "../../authentication/hooks/useAuthContext";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;

            try {
                const response = await fetch('/api/notifications', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }

                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [user]);

    return (
        <Box sx={{ padding: '16px' }}>
            <Typography variant="h5" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>Notifications</Typography>
            <Paper elevation={3} sx={{ padding: '16px', borderRadius: '12px' }}>
                <List>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <React.Fragment key={index}>
                                <ListItem alignItems="flex-start" sx={{ paddingLeft: '0', paddingRight: '0' }}>
                                    <ListItemText
                                        primary={notification.message}
                                        secondary={new Date(notification.date).toLocaleString()}
                                        primaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}
                                        secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                                    />
                                </ListItem>
                                {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
                            </React.Fragment>
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">No notifications available</Typography>
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default Notifications;
