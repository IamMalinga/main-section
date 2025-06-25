import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import CloudOffIcon from '@mui/icons-material/CloudOff';

export default function NotFound() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                color: '#2c3e50',
                textAlign: 'center',
                p: 3,
            }}
        >
            <Container maxWidth="sm">
                <CloudOffIcon sx={{ fontSize: 100, mb: 3, color: '#3498db' }} />
                <Typography variant="h2" component="h1" sx={{ fontWeight: '700', mb: 2 }}>
                    Oops!
                </Typography>
                <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                    We can't seem to find the page you're looking for.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: '#7f8c8d' }}>
                    It might have been removed, or you might have mistyped the URL. Let's get you back on track.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={NavLink}
                    to="/"
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        backgroundColor: '#2980b9',
                        '&:hover': {
                            backgroundColor: '#1abc9c',
                        },
                        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Back to Homepage
                </Button>
            </Container>
        </Box>
    );
}
