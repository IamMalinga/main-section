import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Alert,
  Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/users/testimonials');
        if (!response.ok) throw new Error('Failed to fetch testimonials.');
        const data = await response.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: '#0a2742',
        }}
      >
        <CircularProgress sx={{ color: '#ffffff' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          backgroundColor: '#0a2742',
        }}
      >
        <Alert severity="error" sx={{ backgroundColor: '#21374e', color: '#ffffff' }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
              <Box
                id="highlights"
                sx={{
                  pt: { xs: 4, sm: 12 },
                  pb: { xs: 4, sm: 16 },
                  color: 'white',
                  backgroundColor: '#0a2742',
                  width: '100vw',
                  position: 'relative',
                }}
              >
        <Container
          id="testimonials"
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              width: { sm: '100%', md: '60%' },
              textAlign: 'center',
              mb: 6,
            }}
          >
            <Typography
              component="h2"
              variant="h4"
              color="#fff"
              fontWeight="bold"
              gutterBottom
              sx={{ fontFamily: 'Quicksand' }}
            >
              What Our Users Are Saying
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: 'Quicksand', color: '#9dbcd4' }}
            >
              Hear from travelers who have used our app to plan their perfect trip in Sri Lanka.
            </Typography>
          </Box>

          {/* Testimonials Grid */}
          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} sm={6} md={4} key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: '100%',
                      minHeight: '650px',
                      p: 3,
                      background: 'linear-gradient(145deg, #1a2e44, #0e2035)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    {/* Avatar and User Info */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Avatar
                        src={testimonial.profilePic}
                        alt={testimonial.name}
                        sx={{
                          width: 120,
                          height: 120,
                          mb: 2,
                          border: '4px solid #ffffff',
                          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.35)',
                          },
                        }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                          fontFamily: 'Quicksand',
                          fontSize: '1.3rem',
                          color: '#9dbcd4',
                          textAlign: 'center',
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: 'Quicksand',
                          fontSize: '1rem',
                          color: '#7da3c7',
                          textAlign: 'center',
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>

                    {/* Feedback */}
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{
                          fontFamily: 'Quicksand',
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          letterSpacing: '0.5px',
                          textAlign: 'center',
                          color: '#c8d9ea',
                        }}
                      >
                        "{testimonial.feedback}"
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mt: 2,
                        }}
                      >
                        <Rating
                          value={testimonial.rating}
                          readOnly
                          size="large"
                          sx={{
                            '& .MuiRating-iconFilled': {
                              color: '#FFC107',
                            },
                            '& .MuiRating-iconEmpty': {
                              color: '#4c6173',
                            },
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontFamily: 'Quicksand',
                            color: '#7da3c7',
                            fontWeight: 500,
                          }}
                        >
                          {testimonial.category}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default Testimonials;
