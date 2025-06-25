import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    List,
    Container,
    Typography,
    Button,
    TextField,
    Rating,
    Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stepper,
    Step,
    StepLabel,
    Divider,
    Avatar,
    Stack,
    Grid,
    ImageList,
    ImageListItem,
} from '@mui/material';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import PaymentForm from './PaymentForm';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';
import LanguageIcon from '@mui/icons-material/Language';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay  } from 'swiper/modules';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const steps = ['Booking Details', 'Payment Information', 'Review and Confirm'];

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#011f4b',
    },
    secondary: {
      main: '#FF6F61',
    },
    background: {
      default: '#0a2742',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9dbcd4',
    },
  },
});

const TravelGuidePage = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const response = await fetch(`/api/travel-guides/${id}`);
                if (!response.ok) throw new Error('Failed to fetch guide details');
                const data = await response.json();
                setGuide(data);
            } catch (error) {
                console.error('Error fetching guide:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGuide();
    }, [id]);

    const handleBooking = () => {
        setCheckoutOpen(true);
    };

    const handleConfirmBooking = async () => {
        if (!startDate || !endDate) {
            alert('Please provide both start and end dates.');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayDifference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        if (dayDifference <= 0) {
            alert('End date must be after the start date.');
            return;
        }

        const totalPrice = dayDifference * guide.pricePerDay;

        try {
            const response = await fetch(`/api/travel-guides/${id}/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ startDate, endDate, totalPrice }),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Booking successful!');
                setCheckoutOpen(false);
                console.log('Booking data:', result);
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to book guide.');
            }
        } catch (error) {
            console.error('Booking error:', error);
        }
    };

    const handleAddReview = async () => {
        try {
            const response = await fetch(`/api/travel-guides/${id}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({ review: reviewText, rating: reviewRating }),
            });

            if (response.ok) {
                alert('Review added successfully!');
                setReviewText('');
                setReviewRating(0);
                const updatedGuide = await response.json();
                setGuide(updatedGuide);
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to add review.');
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);

    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (!guide) {
        return (
            <Typography variant="h6" color="error" sx={{ textAlign: 'center', mt: 5 }}>
                Failed to load guide details.
            </Typography>
        );
    }

    return (
        <ThemeProvider theme={theme}>
        <Container sx={{ mt: 8, mb: 8 }}>
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: '20px',
                    backgroundColor: '#0a2945',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                }}
            >
                <Box textAlign="center" mb={4}>
                <Box
    sx={{
        textAlign: 'center',
        p: 4,
        borderRadius: '12px',
        backgroundColor: 'primary.main',
        color: 'text.primary',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
        mb: 4
    }}
>
    <Avatar
        src={guide.profilePic || 'default-profile.jpg'}
        alt={guide.name}
        sx={{
            width: 150,
            height: 150,
            mx: 'auto',
            mb: 2,
            border: '4px solid secondary.main',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
    />
    <Typography
        variant="h3"
        sx={{
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            color: 'secondary.main',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
    >
        {guide.name}
    </Typography>
        {/* Rating Section */}
        <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <Rating
            value={guide.rating || 0}
            readOnly
            precision={0.5}
            sx={{
                fontSize: '2rem',
                color: 'fff',
            }}
        />
        <Typography
            variant="body1"
            sx={{
                ml: 1,
                fontFamily: 'Poppins, sans-serif',
                color: '#fff',
            }}
        >
            ({guide.rating || 0})
        </Typography>
    </Box>
    <Divider
        sx={{
            my: 4,
            borderColor: 'secondary.main',
            borderWidth: 2,
            width: '50%',
            mx: 'auto',
        }}
    />
</Box>




                    <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
    <Grid item xs={12} md={4}>
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: 'primary.main',
                color: 'text.primary',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            }}
        >
            <PlaceIcon sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }} />
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 1,
                }}
            >
                Location
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    color: 'text.secondary',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {guide.location?.name || 'Unknown'}
            </Typography>
        </Paper>
    </Grid>

    <Grid item xs={12} md={4}>
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: 'primary.main',
                color: 'text.primary',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            }}
        >
            <WorkIcon sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }} />
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 1,
                }}
            >
                Experience
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    color: 'text.secondary',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {guide.experienceYears || 0} years
            </Typography>
        </Paper>
    </Grid>

    <Grid item xs={12} md={4}>
        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 4,
                textAlign: 'center',
                backgroundColor: 'primary.main',
                color: 'text.primary',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
            }}
        >
            <LanguageIcon sx={{ color: 'secondary.main', fontSize: 40, mb: 1 }} />
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    mb: 1,
                }}
            >
                Languages
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    color: 'text.secondary',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {guide.languages?.join(', ') || 'N/A'}
            </Typography>
        </Paper>
    </Grid>
</Grid>

                   

{/* Gallery Section */}
{guide.experienceImages?.length > 0 && (
    <Box mb={4}>
        <Typography
            variant="h5"
            sx={{
                fontWeight: 'bold',
                mb: 3,
                fontFamily: 'Poppins, sans-serif',
                color: '#007bff',
                textAlign: 'center',
            }}
        >
            Experience Gallery
        </Typography>
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            style={{ borderRadius: '10px' }}
        >
            {guide.experienceImages.map((image, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={image}
                        alt={`Experience ${index + 1}`}
                        style={{
                            width: '100%',
                            height: '400px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                        }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </Box>
)}



<Box
    sx={{
        textAlign: 'center',
        py: 4,
        px: 2,
        backgroundColor: 'background.default',
        borderRadius: '12px',
        color: 'text.primary',
    }}
>


    {/* Bio Section */}
    <Typography
        variant="body1"
        sx={{
            mt: 2,
            px: 2,
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.2rem',
            lineHeight: 2.5,
            color: 'text.secondary',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 2,
            borderRadius: '10px',
            textAlign: 'justify',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
    >
        {guide.bio || 'No bio available.'}
    </Typography>

    {/* Price Section */}
    <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
            mt: 4,
            fontFamily: 'Poppins, sans-serif',
            color: 'secondary.main',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
        }}
    >
        <AttachMoneyIcon sx={{ verticalAlign: 'middle', fontSize: '2rem', mr: 1 }} />
        {guide.pricePerDay || 0} <Typography variant="h6" sx={{ ml: 1 }}>per day</Typography>
    </Typography>

    {/* Book Now Button */}
    <Button
        variant="contained"
        color="secondary"
        onClick={handleBooking}
        sx={{
            mt: 4,
            px: 5,
            py: 1.5,
            borderRadius: '30px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
            ':hover': {
                backgroundColor: 'secondary.dark',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            },
        }}
    >
        Book Now
    </Button>
</Box>

                </Box>


                <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} maxWidth="md" fullWidth>
                    <DialogTitle>Complete Your Booking</DialogTitle>
                    <DialogContent>
                        <Stepper activeStep={activeStep} sx={{ py: 3 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 0 && (
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Booking Details
                                </Typography>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        )}
                        {activeStep === 1 && (
                            <PaymentForm guide={guide} bookingDates={{ startDate, endDate }} />
                        )}
                    </DialogContent>
                    <DialogActions>
                        {activeStep > 0 && (
                            <Button onClick={handleBack} variant="outlined" color="secondary">
                                Back
                            </Button>
                        )}
    <Button
        onClick={
            activeStep === steps.length - 1
                ? handleConfirmBooking // Call handleConfirmBooking on the last step
                : handleNext // Move to the next step otherwise
        }
        variant="contained"
        color="primary"
    >
        {activeStep === steps.length - 1 ? 'Confirm Booking' : 'Next'}
    </Button>
                    </DialogActions>
                </Dialog>

                <Typography variant="h5" mt={6} fontWeight="bold">
                    Reviews
                </Typography>
                {/* Reviews */}
                <List>
                    {guide.reviews?.length > 0 ? (
                        guide.reviews.map((review, index) => (
                            <Paper
    key={index}
    sx={{
        padding: 3,
        mb: 3,
        borderRadius: '16px',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Poppins, sans-serif',
    }}
>
    <Box display="flex" alignItems="center" mb={2}>
        <Avatar
            src={review.user?.profilePic || 'default-avatar.jpg'}
            alt={`${review.user?.firstName || 'User'}'s Avatar`}
            sx={{
                width: 50,
                height: 50,
                border: '2px solid #007bff',
                mr: 2,
            }}
        />
        <Box>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 'bold',
                    color: '#343a40',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {review.user?.firstName} {review.user?.lastName || 'Anonymous'}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: '#6c757d',
                    fontSize: '0.9rem',
                    fontFamily: 'Poppins, sans-serif',
                }}
            >
                {new Date(review.createdAt).toLocaleDateString() || 'N/A'}
            </Typography>
        </Box>
    </Box>
    <Divider sx={{ mb: 2 }} />
    <Typography
        variant="body1"
        sx={{
            color: '#495057',
            lineHeight: 1.6,
            fontFamily: 'Poppins, sans-serif',
        }}
    >
        {review.review || 'No review text available.'}
    </Typography>
    <Box display="flex" alignItems="center" mt={2}>
        <Rating
            value={review.rating || 0}
            readOnly
            precision={0.5}
            sx={{ mr: 1 }}
        />
        <Typography
            variant="body2"
            sx={{
                color: '#6c757d',
                fontSize: '0.9rem',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            {review.rating ? `${review.rating} / 5` : 'No rating'}
        </Typography>
    </Box>
</Paper>

                        ))
                    ) : (
                        <Typography>No reviews yet.</Typography>
                    )}
                </List>
            </Paper>
        </Container>
        </ThemeProvider>
    );
};

export default TravelGuidePage;
