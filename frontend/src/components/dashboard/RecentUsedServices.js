import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Avatar,
    IconButton,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';

const services = [
    { name: 'Hotel Booking', icon: '🏨', path: '/services/hotel-booking' },
    { name: 'Restaurants', icon: '🍴', path: '/restaurants' },
    { name: 'Vehicle Hire', icon: '🚗', path: '/services/vehicle-hire' },
    { name: 'Special Events', icon: '🎉', path: '/services/special-events' },
    { name: 'Weather Details', icon: '🌤️', path: '/services/weather' },
    { name: 'Open Chat', icon: '💬', path: '/services/open-chat' },
    { name: 'Travel Guiders', icon: '🗺️', path: '/services/travel-guiders' },
];

// Create a custom theme for Poppins font
const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
});

const RecentUsedServices = () => {
    const [recentServices, setRecentServices] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchRecentServices = async () => {
            try {
                const response = await fetch('/api/recent-services', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setRecentServices(data);
            } catch (error) {
                console.error('Error fetching recent services:', error);
            }
        };

        fetchRecentServices();
    }, [user.token]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    padding: '24px',
                    
                    borderRadius: '16px',
                    
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        color: '#2b2b2b',
                        textAlign: 'center',
                    }}
                >
                    Recently Used Services
                </Typography>
                <Paper
                    elevation={3}
                    sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    {recentServices.length > 0 ? (
                        <List sx={{ padding: 0 }}>
                            {recentServices.map((service, index) => {
                                const matchedService = services.find(
                                    (s) => s.name === service.serviceName
                                ) || {
                                    name: service.serviceName,
                                    icon: '✨',
                                };

                                return (
                                    <React.Fragment key={service._id}>
                                        <ListItem
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '16px',
                                                '&:hover': {
                                                    background: 'rgba(0, 0, 0, 0.05)',
                                                },
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar
                                                    sx={{
                                                        backgroundColor: '#1976d2',
                                                        color: '#ffffff',
                                                        marginRight: '12px',
                                                        fontSize: '1.2rem',
                                                    }}
                                                >
                                                    {matchedService.icon}
                                                </Avatar>
                                                <ListItemText
                                                    primary={matchedService.name}
                                                    secondary={new Date(
                                                        service.usedAt
                                                    ).toLocaleString()}
                                                    primaryTypographyProps={{
                                                        variant: 'body1',
                                                        fontWeight: '500',
                                                        color: '#333',
                                                    }}
                                                    secondaryTypographyProps={{
                                                        variant: 'body2',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                            </Box>
                                            <IconButton
                                                edge="end"
                                                aria-label="details"
                                                sx={{
                                                    color: '#1976d2',
                                                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                                                }}
                                            >
                                                <ChevronRightIcon />
                                            </IconButton>
                                        </ListItem>
                                        {index < recentServices.length - 1 && (
                                            <Divider sx={{ margin: '0 16px' }} />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    ) : (
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: '32px',
                                color: '#757575',
                            }}
                        >
                            <Typography variant="body1">No recent services used</Typography>
                        </Box>
                    )}
                </Paper>
            </Box>
        </ThemeProvider>
    );
};

export default RecentUsedServices;
