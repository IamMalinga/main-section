import React, { useState, useEffect } from 'react';
import {
    Box,
    Snackbar,
    CircularProgress,
    Alert,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from '@mui/material';
import { useTripContext } from '../../hooks/useTripContext';
import { chatSession } from '../../config/AIModel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import { getPlaceDetails } from '../../config/GlobalAPI';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1920&key=AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0';

const Destinations = () => {
    const { tripData } = useTripContext();
    const [aiResult, setAIResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const [dest, setDest] = useState(tripData.destinations);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = snackbarState;


    const fetchOptimizedRoutes = async () => {
        try {
            const tripId = tripData?.id || localStorage.getItem('trip').id; // Retrieve trip ID from local storage
            if (!tripId) {
                setError('No trip ID found.');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/trips/get-route-data-using-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tripId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch optimized routes.');
            }

            const data = await response.json();
            if (!data.destinations || data.destinations.length === 0) {
                throw new Error('No destinations found in the database.');
            }

            setDest(data.destinations);

        } catch (err) {
            console.error('Error fetching optimized routes:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchPhotoUrl = async (name) => {
        try {
            if (!name) return null;

            const data = { textQuery: name };
            const result = await getPlaceDetails(data);

            const places = result?.places;
            if (!places || !places.length) return null;

            const photos = places[0]?.photos;
            if (!photos || !photos.length) return null;

            return PHOTO_REF_URL.replace('{NAME}', photos[0].name);
        } catch (error) {
            console.error('Error fetching photo:', error);
            return null;
        }
    };


    useEffect(() => {

        const generateAIContent = async () => {
            if (!tripData) {
                setMessage('No trip data found.');
                setSnackbarState({ ...snackbarState, open: true });
                setLoading(false);
                return;
            }

            try {
  
                const AI_PROMPT = `Generate a detailed Travel Plan for the following destinations: ${dest
                .map((destination) => destination.name)
                .join(', ')}. The trip is planned for ${tripData.days} days for ${tripData.people} people with a ${tripData.budget} budget. Include hotel options and a day-by-dat itinerary(with name) for all destinations in JSON format.`;
            
                const result = await chatSession.sendMessage(AI_PROMPT);
                const data = await result.response.text();
                console.log(data);
                const parsedData = JSON.parse(data);
                console.log(parsedData);

                if (!parsedData.hotels || !parsedData.itinerary) {
                    throw new Error('Invalid AI response format.');
                }

                const hotelsWithImages = await Promise.all(
                    parsedData.hotels.map(async (hotel) => ({
                        ...hotel,
                        imageUrl: await fetchPhotoUrl(hotel.hotelName),
                    }))
                );


                const itineraryWithImages = Object.entries(parsedData.itinerary).map(
                    async ([day, details]) => ({
                        ...details,
                        activities: await Promise.all(
                            details.activities.map(async (activity) => ({
                                ...activity,
                                imageUrl: await fetchPhotoUrl(activity.name),
                            }))
                        ),
                    })
                );


                setAIResult({
                    hotels: hotelsWithImages,
                    itinerary: await Promise.all(itineraryWithImages),
                });
            } catch (err) {
                console.error('AI Error:', err);
                setError('Failed to generate content from AI.');
                setMessage('An error occurred while generating travel plans.');
                setSnackbarState({ ...snackbarState, open: true });
            } finally {
                setLoading(false);
            }
        };

        generateAIContent();
    }, [dest, tripData]);

    useEffect(() => {
        fetchOptimizedRoutes();
    }, []); // Fetch optimized routes only once on component mount

    const handleCloseSnackbar = () => {
        setSnackbarState({ ...snackbarState, open: false });
    };

    const renderLoading = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', ml: 2 }}>
                Generating travel plan...
            </Typography>
        </Box>
    );

    const renderError = () =>
        error && (
            <Alert severity="error" sx={{ mt: 2, fontFamily: 'Poppins, sans-serif' }}>
                {error}
            </Alert>
        );

    const renderHotels = () =>
        aiResult?.hotels?.length ? (
            <>
                <Typography
                    variant="h4"
                    sx={{
                      marginBottom: '32px',
                      fontWeight: 'bold',
                      color: '#1976D2',
                      textAlign: 'center',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                >
                    Hotel Recommendations
                </Typography>
                <Grid container spacing={3} sx={{mb: 5}}>
                    {aiResult.hotels.map((hotel, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%',
                                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '12px',
                                    '&:hover': { transform: 'scale(1.03)', boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)' },
                                    transition: 'transform 0.3s ease-in-out',
                                    
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    sx={{ height: '200px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                                    image={hotel.imageUrl || './assets/placeholder.jpg'}
                                    alt={hotel.hotelName}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: '#222',
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        {hotel.hotelName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: '#777',
                                            fontFamily: 'Poppins, sans-serif',
                                            mt: 1,
                                        }}
                                    >
                                        <LocationOnIcon sx={{ mr: 0.5, color: '#888' }} />
                                        {hotel.hotelAddress}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: 1,
                                            color: '#555',
                                            fontFamily: 'Poppins, sans-serif',
                                        }}
                                    >
                                        <AttachMoneyIcon sx={{ mr: 0.5, color: '#888' }} />
                                        {hotel.priceRange || 'N/A'} per night
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: 1,
                                            fontFamily: 'Poppins, sans-serif',
                                            color: '#FFD700',
                                        }}
                                    >
                                        <StarIcon sx={{ mr: 0.5 }} />
                                        {hotel.rating || 'N/A'} stars
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        ) : (
            <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>No hotels found.</Typography>
        );

        const renderItinerary = () =>
            aiResult?.itinerary ? (
                <>
                    <Typography
                        variant="h4"
                        sx={{
                            marginBottom: '20px',
                            fontWeight: 'bold',
                            color: '#1976D2',
                            textAlign: 'center',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        Places to Visit
                    </Typography>
                    {Object.entries(aiResult.itinerary).map(([day, details], index) => (
                        <Box
                            key={index}
                            sx={{
                                mt: 4,
                                p: 3,
                                borderRadius: '12px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 2,
                                    fontFamily: 'Poppins, sans-serif',
                                    color: '#444',
                                    fontWeight: 'bold',
                                }}
                            >
                                Day {Number(day) + 1} - {details.destination || details.location} 
                            </Typography>
                            <Grid container spacing={3}>
                                {details.activities.map((activity, idx) => (
                                    <Grid item xs={12} sm={6} md={4} key={idx}>
                                        <Card
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: '12px',
                                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
                                                overflow: 'hidden',
                                                transition: 'transform 0.3s ease-in-out',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                    boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.2)',
                                                },
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={activity.imageUrl || './assets/placeholder.jpg'}
                                                alt={activity.activity}
                                                sx={{
                                                    objectFit: 'cover',
                                                    borderBottom: '1px solid #ddd',
                                                }}
                                            />
                                            <CardContent sx={{ padding: 2 }}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontFamily: 'Poppins, sans-serif',
                                                        color: '#1976D2',
                                                        fontWeight: 'bold',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {activity.name || 'Activity'}
                                                </Typography>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontFamily: 'Poppins, sans-serif',
                                                        color: '#555',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {activity.activity}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: 'Poppins, sans-serif',
                                                        color: '#777',
                                                        mb: 1,
                                                    }}
                                                >
                                                    {activity.description}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        mt: 2,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontFamily: 'Poppins, sans-serif',
                                                            color: '#777',
                                                        }}
                                                    >
                                                        <AccessTimeIcon sx={{ mr: 0.5, color: '#1976D2' }} />
                                                        {activity.time}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            fontFamily: 'Poppins, sans-serif',
                                                            color: '#777',
                                                        }}
                                                    >
                                                        <AttachMoneyIcon sx={{ mr: 0.5, color: '#1976D2' }} />
                                                        {activity.estimatedCost}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))}
                </>
            ) : (
                <Typography
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        textAlign: 'center',
                        color: '#999',
                        mt: 4,
                    }}
                >
                    No itinerary found.
                </Typography>
            );

            

    return (
        <Box sx={{ width: '100%', padding: 2, fontFamily: 'Poppins, sans-serif' }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleCloseSnackbar}
                message={message}
                autoHideDuration={6000}
            />
            {loading ? renderLoading() : (
                <>
                    {renderHotels()}
                    {renderItinerary()}
                </>
            )}
            {renderError()}
        </Box>
    );
};

export default Destinations;
