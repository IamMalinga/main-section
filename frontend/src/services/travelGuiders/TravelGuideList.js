import React, { useEffect, useState } from 'react';
import GuideCard from './GuideCard';
import BookedGuidesList from './BookedGuidesList';
import { 
    Grid, 
    Container, 
    Typography, 
    TextField, 
    MenuItem, 
    Slider, 
    Button, 
    Paper, 
    Box, 
    CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTripContext } from '../../hooks/useTripContext';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';

const TravelGuideList = () => {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState([50, 200]);
    const [minRating, setMinRating] = useState(3);
    const [languages, setLanguages] = useState(['English']);
    const navigate = useNavigate();
    const { tripData } = useTripContext();
    const { user } = useAuthContext();

    const fetchGuides = async () => {
        if (!tripData || !tripData.destinations || tripData.destinations.length === 0) return;

        const currentDestination = tripData.destinations[0];
        const { lat, lng } = currentDestination.position;

        try {
            setLoading(true);
            const response = await fetch(`/api/travel-guides/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    lat,
                    lng,
                    maxDistance: 20,
                    minRating,
                    priceRange,
                    languages,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch travel guides');
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                setGuides(data);
            } else {
                throw new Error('Invalid data format: Expected an array');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuides();
    }, [tripData, priceRange, minRating, languages]);

    const handleClearFilters = () => {
        setPriceRange([50, 200]);
        setMinRating(3);
        setLanguages([]);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography 
                    variant="h6" 
                    color="error" 
                    gutterBottom 
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    Error: {error}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={fetchGuides}
                    sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Container>
  <Box
      sx={{
        padding: 4,
        mb: 4,
        mt: 4,
        borderRadius: 3,
        fontFamily: "Poppins, sans-serif",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
        bgcolor: "#f7f9fc",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 600,
          textAlign: "center",
          color: "primary.main",
        }}
      >
        Find Your Perfect Guide
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Minimum Rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            fullWidth
            variant="outlined"
            sx={{
              fontFamily: "Poppins, sans-serif",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              "& .MuiInputLabel-root": { fontFamily: "Poppins, sans-serif" },
              "& .MuiOutlinedInput-root": {
                fontFamily: "Poppins, sans-serif",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography
            gutterBottom
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            Price Range per Day
          </Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            marks
            sx={{
              color: "primary.main",
              "& .MuiSlider-thumb": {
                bgcolor: "primary.main",
                ":hover": { boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.3)" },
              },
              "& .MuiSlider-track": { bgcolor: "primary.main" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Languages"
            select
            fullWidth
            value={languages}
            onChange={(e) =>
              setLanguages(
                typeof e.target.value === "string"
                  ? e.target.value.split(",")
                  : e.target.value
              )
            }
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.join(", "),
            }}
            variant="outlined"
            sx={{
              fontFamily: "Poppins, sans-serif",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              "& .MuiInputLabel-root": { fontFamily: "Poppins, sans-serif" },
              "& .MuiOutlinedInput-root": {
                fontFamily: "Poppins, sans-serif",
              },
            }}
          >
            {["English", "Spanish", "French", "German"].map((lang) => (
              <MenuItem
                key={lang}
                value={lang}
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "text.primary",
                }}
              >
                {lang}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            mr: 2,
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            borderColor: "primary.main",
            color: "primary.main",
            ":hover": {
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              borderColor: "primary.main",
            },
          }}
        >
          Clear Filters
        </Button>
        <Button
          variant="contained"
          onClick={fetchGuides}
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            bgcolor: "primary.main",
            ":hover": { backgroundColor: "primary.dark" },
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>

            <Grid container spacing={3}>
                {guides.length > 0 ? (
                    guides.map((guide) => (
                        <Grid item xs={12} sm={6} md={4} key={guide._id}>
                            <GuideCard 
                                guide={guide} 
                                onViewDetails={(id) => navigate(`/services/travel-guiders/${id}`)} 
                            />
                        </Grid>
                    ))
                ) : (
                    <Box display="flex" justifyContent="center" width="100%" mt={4}>
                        <Typography 
                            variant="h6" 
                            sx={{ fontFamily: 'Poppins, sans-serif', color: 'text.secondary' }}
                        >
                            No guides available for the selected filters.
                        </Typography>
                    </Box>
                )}
            </Grid>

            <Typography 
                variant="h4" 
                sx={{ 
                    mt: 5, 
                    mb: 3, 
                    fontFamily: 'Poppins, sans-serif', 
                    fontWeight: 600 
                }}
            >
                My Booked Guides
            </Typography>
            <BookedGuidesList />
        </Container>
    );
};

export default TravelGuideList;
