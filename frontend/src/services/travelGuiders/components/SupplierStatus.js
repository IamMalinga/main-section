import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { updateSupplierStatus } from '../services/supplierService';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const SupplierStatus = ({ status, setStatus, user }) => {
    const handleStatusChange = async () => {
        try {
            const newStatus = status === 'active' ? 'inactive' : 'active';
            await updateSupplierStatus(user, newStatus);
            setStatus(newStatus);
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                p: 4,
                mb: 4,
                borderRadius: '12px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'background.default',
                color: 'text.primary',
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                {/* Status Indicator */}
                <LightbulbIcon
                    sx={{
                        fontSize: 60,
                        color: status === 'active' ? 'green' : 'red',
                        mb: 2,
                        transition: 'color 0.3s ease, box-shadow 0.3s ease',
                        boxShadow:
                            status === 'active'
                                ? '0 0 15px 4px rgba(0, 255, 0, 0.6)' // Green glow for active
                                : '0 0 15px 4px rgba(255, 0, 0, 0.6)', // Red glow for inactive
                        borderRadius: '50%',
                    }}
                />

                {/* Status Text */}
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                        fontFamily: 'Poppins, sans-serif',
                        mb: 1,
                        color: status === 'active' ? 'green' : 'red',
                    }}
                >
                    {status === 'active' ? 'Your account is active' : 'Your account is inactive'}
                </Typography>

                {/* Status Button */}
                <Button
                    variant="contained"
                    color={status === 'active' ? 'secondary' : 'primary'}
                    onClick={handleStatusChange}
                    sx={{
                        mt: 3,
                        px: 4,
                        py: 1.5,
                        borderRadius: '20px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        ':hover': {
                            backgroundColor: status === 'active' ? 'secondary.dark' : 'primary.dark',
                        },
                    }}
                >
                    {status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
            </Box>
        </Paper>
    );
};

export default SupplierStatus;
