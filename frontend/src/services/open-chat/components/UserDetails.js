import * as React from 'react';
import { Box, Typography } from '@mui/material';

const UserDetails = ({ user }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            padding: '20px',
            borderRight: '1px solid #e0e0e0'
        }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                User Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Location: {user.location || 'Unknown'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Member since: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Interests: {user.interests || 'Not specified'}
            </Typography>
        </Box>
    );
}

export default UserDetails;
