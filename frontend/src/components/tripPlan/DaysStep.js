import React from 'react';
import { Grid, TextField, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';

const DaysStep = ({ tripData, updateTripData }) => {
    return (
        <Box p={3}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                    <Paper
                        elevation={4}
                        sx={{
                            padding: 3,
                            borderRadius: 4,
                            backgroundColor: '#fff',
                        }}
                    >
                        <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
                            Number of Days
                        </Typography>
                        <TextField
                            label="Days"
                            type="number"
                            value={tripData.days}
                            onChange={(e) => updateTripData({ days: e.target.value })}
                            fullWidth
                            margin="normal"
                            sx={{
                                borderRadius: 8,
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#1976D2',
                                    },
                                },
                            }}
                        />
                        <Box mt={4}>
                            <Typography variant="h6" gutterBottom>
                                View Public Holidays
                            </Typography>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '400px',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?src=en.lk%23holiday%40group.v.calendar.google.com&ctz=Asia%2FColombo"
                                    style={{ border: 0, width: '100%', height: '100%' }}
                                    frameBorder="0"
                                    scrolling="no"
                                    title="Sri Lanka Holidays Calendar"
                                ></iframe>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper
                        elevation={4}
                        sx={{
                            height: '100%',
                            background: `url('/assets/days.jpg') no-repeat center center`,
                            backgroundSize: 'cover',
                            borderRadius: 4,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default DaysStep;
