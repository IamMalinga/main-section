import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import HotelCard from './HotelCard';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [searchCity, setSearchCity] = useState('');

    const fetchHotels = (city = '') => {
        axios
            .get('/api/hotels/search', { params: { city } })
            .then((res) => setHotels(res.data))
            .catch((err) => console.error('Error fetching hotels:', err));
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    const handleSearch = () => fetchHotels(searchCity);

    return (
        <Box sx={{ p: 4 }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                mb={4}
                flexDirection={{ xs: 'column', sm: 'row' }}
            >
                <TextField
                    label="Search by City"
                    variant="outlined"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    sx={{ flex: 1 }}
                />
                <Button variant="contained" onClick={handleSearch} sx={{ px: 4 }}>
                    Search
                </Button>
            </Box>
            <Grid container spacing={1}>
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <Grid item key={hotel._id} xs={12} sm={6} md={3} marginBottom={8}>
                            <HotelCard hotel={hotel} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', width: '100%' }}>
                        No hotels found. Try another city.
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};

export default HotelList;

