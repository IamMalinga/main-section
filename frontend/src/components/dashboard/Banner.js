import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import { useTripContext } from "../../hooks/useTripContext";
import { getPlaceDetails } from '../../config/GlobalAPI';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1080&maxWidthPx=1920&key=AIzaSyAjiU4RsJfNJoVcll2oEsIaTdzw6p3Srl0';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
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
      primary: '#000',
      secondary: '#9dbcd4',
    },
  },
});

const Banner = () => {
  const { tripData } = useTripContext();
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (tripData && tripData.destinations?.length > 0) {
      const interval = setInterval(() => {
        setCurrentDestinationIndex((prevIndex) => 
          (prevIndex + 1) % tripData.destinations.length
        );
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }
  }, [tripData]);

  useEffect(() => {
    GetPlacePhoto();
  }, [tripData, currentDestinationIndex]);

  const GetPlacePhoto = async () => {
    try {
      if (!tripData || !tripData.destinations[currentDestinationIndex]?.name) {
        console.error('Invalid trip data.');
        return;
      }

      const data = { textQuery: tripData.destinations[currentDestinationIndex]?.name };
      const result = await getPlaceDetails(data);

      const places = result?.places;
      if (!places || places.length === 0) {
        console.error('No places found in the response.');
        return;
      }

      const photos = places[0]?.photos;
      if (!photos || photos.length === 0) {
        console.error('No photos found for the place.');
        return;
      }

      const photoUrl = PHOTO_REF_URL.replace('{NAME}', photos[2].name);
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  const currentDestination = tripData?.destinations[currentDestinationIndex];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          bgcolor: (theme) => theme.palette.background.default,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // subtle shadow
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', // smooth hover effect
          background: 'linear-gradient(145deg, #0a2742, #09253c)', // gradient background for depth
          overflow: 'hidden',
          p: 3,
          mt: 4,
          mx: 'auto',
          color: '#FFFFFF',
        }}
      >
        {tripData && currentDestination ? (
          <>
            <Box
              sx={{
                width: '100%',
                height: '300px',
                borderRadius: 4,
                overflow: 'hidden',
                position: 'relative',
                mb: 3,
                background: '#222',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.6)',
              }}
            >
              <img
                src={photoUrl || '/default-placeholder.jpg'}
                alt={currentDestination.name || "Destination Image"}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 1,
                background: 'linear-gradient(90deg, #FF7E5F, #FFB88C)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {currentDestination.name || "Unnamed Destination"}
            </Typography>
            <Divider sx={{ width: '50%', my: 2, borderColor: '#444' }} />
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mt: 2,
              }}
            >
              <Chip
                icon={<CalendarTodayIcon />}
                label={`${tripData.days || 'N/A'} Days`}
                sx={{
                  background: 'linear-gradient(90deg, #6A11CB, #2575FC)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  px: 2,
                  py: 1,
                  borderRadius: 4,
                }}
              />
              <Chip
                icon={<AttachMoneyIcon />}
                label={`${tripData.budget?.charAt(0).toUpperCase() + tripData.budget?.slice(1) || 'N/A'} Budget`}
                sx={{
                  background: 'linear-gradient(90deg, #F7971E, #FFD200)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  px: 2,
                  py: 1,
                  borderRadius: 4,
                }}
              />
              <Chip
                icon={<PeopleIcon />}
                label={`Travelers: ${tripData.people || 'N/A'}`}
                sx={{
                  background: 'linear-gradient(90deg, #00B4DB, #0083B0)',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  px: 2,
                  py: 1,
                  borderRadius: 4,
                }}
              />
            </Box>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: '#bbb', textAlign: 'center' }}>
            No Trip Selected
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Banner;
