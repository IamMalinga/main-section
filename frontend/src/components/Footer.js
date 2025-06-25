import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Link,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

import Logo from '../assets/Logo.png';

const footerStyles = {
  bgColor: '#1A1A1A',
  textColor: '#FFFFFF',
  linkHoverColor: '#FF6F61',
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubscribe = async () => {
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again.');
      }

      setSnackbarMessage('Subscribed successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setEmail('');
    } catch (error) {
      setSnackbarMessage(error.message || 'An error occurred.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <Box
      sx={{
        backgroundColor: footerStyles.bgColor,
        color: footerStyles.textColor,
        py: 6,
        px: { xs: 3, sm: 6, md: 10 },
        fontFamily: 'Poppins, Arial, sans-serif',
      }}
    >
      <Grid container spacing={4} alignItems="flex-start">
        {/* Logo and Newsletter Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box>
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                width: '150px',
                mb: 2,
              }}
            />
            <Typography variant="body1" sx={{ mb: 2, fontFamily: 'poppins' }}>
              Subscribe to our newsletter for travel tips, guides, and exclusive offers.
            </Typography>
            <Stack direction="row" spacing={1}>
            <TextField
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Your email"
  variant="outlined"
  size="small"
  sx={{
    fontFamily: 'Poppins, Arial, sans-serif', // Applies to the input text
    bgcolor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '5px',
    color: '#FFF',
    '& .MuiInputBase-input': {
      color: footerStyles.textColor,
      fontFamily: 'Poppins, Arial, sans-serif', // Ensures input text uses Poppins
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
      '&:hover fieldset': { borderColor: footerStyles.linkHoverColor },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Poppins, Arial, sans-serif', // Ensures placeholder text uses Poppins
      fontStyle: 'italic', // Optional: Makes the placeholder look distinct
    },
  }}
/>

              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{
                    fontFamily: 'poppins',
                    background: 'linear-gradient(145deg, #1a2e44, #0e2035)',
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#E65A50' },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Grid>

        {/* Navigation Links */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Explore
          </Typography>
          <Stack spacing={1}>
            {['Destinations', 'Trip Planner', 'Travel Tips', 'Community', 'Blog'].map((link) => (
              <Link
                key={link}
                href="#"
                underline="none"
                sx={{
                  color: footerStyles.textColor,
                  transition: 'color 0.3s',
                  '&:hover': { color: footerStyles.linkHoverColor },
                }}
              >
                {link}
              </Link>
            ))}
          </Stack>
        </Grid>

        {/* About and Support */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            About Us
          </Typography>
          <Stack spacing={1}>
            {['Our Story', 'Careers', 'Press', 'Help Center', 'Contact Us'].map((link) => (
              <Link
                key={link}
                href="#"
                underline="none"
                sx={{
                  color: footerStyles.textColor,
                  transition: 'color 0.3s',
                  '&:hover': { color: footerStyles.linkHoverColor },
                }}
              >
                {link}
              </Link>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* Divider and Social Links */}
      <Box
        sx={{
          mt: 4,
          pt: 4,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" sx={{ fontFamily: 'Poppins', color: 'rgba(255, 255, 255, 0.7)' }}>
          © {new Date().getFullYear()} Travel Planner. All Rights Reserved.
        </Typography>
        <Stack direction="row" spacing={2} mt={{ xs: 3, sm: 0 }}>
          <IconButton
            href="https://facebook.com"
            sx={{
              color: footerStyles.textColor,
              '&:hover': { color: footerStyles.linkHoverColor },
            }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            sx={{
              color: footerStyles.textColor,
              '&:hover': { color: footerStyles.linkHoverColor },
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://linkedin.com"
            sx={{
              color: footerStyles.textColor,
              '&:hover': { color: footerStyles.linkHoverColor },
            }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Snackbar for Subscription Feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer;
