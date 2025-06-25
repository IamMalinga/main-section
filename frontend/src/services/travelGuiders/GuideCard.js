import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Rating,
  Box,
  createTheme,
  ThemeProvider,

} from '@mui/material';

import { styled } from '@mui/system';

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
    overflow: 'hidden',
    borderRadius: theme.spacing(2),
  }));

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
      default: '#f4f8fb',
    },
    text: {
      primary: '#011f4b',
      secondary: '#9dbcd4',
    },
  },
});

const GuideCard = ({ guide, onViewDetails }) => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 360,
          margin: 'auto',
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.15)',
          ':hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.25)',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: theme.palette.background.default,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={guide.profilePic || './landing_page/profile.png'}
          alt={guide.name}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            ':hover': { transform: 'scale(1.05)' },
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight="bold"
            color="primary"
          >
            {guide.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          >
            📍 <Box sx={{ ml: 0.5 }}>{guide.location.name}</Box>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          >
            👔 <Box sx={{ ml: 0.5 }}>{guide.experienceYears} years of experience</Box>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
          >
            🌐 <Box sx={{ ml: 0.5 }}>{guide.languages.join(', ')}</Box>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Rating value={guide.rating} precision={0.5} readOnly size="small" />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              ({guide.rating})
            </Typography>
          </Box>
          <Typography
            variant="h6"
            color="primary"
            sx={{ mt: 1, fontWeight: 'bold' }}
          >
            ${guide.pricePerDay} / day
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            borderRadius: 0,
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            ':hover': { backgroundColor: theme.palette.primary.dark },
          }}
          onClick={() => onViewDetails(guide._id)}
        >
          View Details
        </Button>
      </Card>
    </ThemeProvider>
  );
};

export default GuideCard;
