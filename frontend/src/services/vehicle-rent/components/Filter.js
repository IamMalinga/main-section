import React from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';

const carTypes = [
    { value: '', label: 'All' },
    { value: 'Car', label: 'Car' },
    { value: 'Bike', label: 'Bike' }
];

const Filter = ({ onFilterChange }) => {
    const handleChange = (e) => {
        onFilterChange(e.target.name, e.target.value);
    };

    return (
        <Box component="form" noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2, boxShadow: 2, borderRadius: 0, fontFamily: 'Poppins, sans-serif', bgColor: 'red' }}>
            <TextField
                label="Car Type"
                name="carType"
                select
                fullWidth
                onChange={handleChange}
            >
                {carTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Current Location"
                name="currentLocation"
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label="Destination"
                name="destination"
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label="Center Name"
                name="centerName"
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label="Location"
                name="location"
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label="From Date"
                name="fromDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
            />
            <TextField
                label="To Date"
                name="toDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={handleChange}
            />
            <Button variant="contained" fullWidth>Apply Filters</Button>
        </Box>
    );
};

export default Filter;
