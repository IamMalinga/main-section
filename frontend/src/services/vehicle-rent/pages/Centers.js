import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Filter from '../components/Filter';
import CentersList from '../components/CentersList';

const Centers = ({ onCenterClick }) => {
    const [filters, setFilters] = useState({
        carType: '',
        currentLocation: '',
        destination: '',
        centerName: '',
        location: '',
        fromDate: '',
        toDate: ''
    });

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Box sx={{ position: 'sticky', top: 16 }}>
                    <Filter onFilterChange={handleFilterChange} />
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <CentersList filters={filters} onCenterClick={onCenterClick} />
            </Grid>
        </Grid>
    );
};

export default Centers;
