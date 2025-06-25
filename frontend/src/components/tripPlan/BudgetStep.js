import React from 'react';
import { Card, CardActionArea, CardContent, Grid, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const BudgetCard = styled(Card)(({ theme, selected }) => ({
    backgroundColor: selected ? theme.palette.primary.light : theme.palette.background.paper,
    borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
    boxShadow: selected ? theme.shadows[2] : 'none',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        borderColor: theme.palette.primary.main,
    },
    borderRadius: theme.shape.borderRadius,
}));

const BudgetStep = ({ tripData, updateTripData }) => {
    const budgets = [
        { label: 'Cheap', description: 'Stay conscious of costs', value: 'cheap', icon: '💸' },
        { label: 'Moderate', description: 'Keep cost on the average side', value: 'moderate', icon: '💰' },
        { label: 'Luxury', description: 'Don\'t worry about cost', value: 'luxury', icon: '💵' },
    ];

    return (
        <Box p={3}>
            <Paper elevation={3} sx={{ textAlign: 'center', padding: 3, borderRadius: 4, mb: 4 }}>
                <img
                    src="/path/to/your/image.png"
                    alt="Budget Planning"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                    What's Your Budget for This Trip?
                </Typography>
            </Paper>
            <Grid container spacing={4}>
                {budgets.map((budget) => (
                    <Grid item xs={12} md={4} key={budget.value}>
                        <BudgetCard
                            variant="outlined"
                            selected={tripData.budget === budget.value}
                            onClick={() => updateTripData({ budget: budget.value })}
                        >
                            <CardActionArea>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {budget.icon} {budget.label}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {budget.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </BudgetCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BudgetStep;
