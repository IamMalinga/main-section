import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle, IconButton, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Centers from '../pages/Centers';
import Center from '../components/Center';

const VehicleRentLayout = () => {
    const [selectedCenter, setSelectedCenter] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleCenterClick = (center) => {
        setSelectedCenter(center);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedCenter(null);
    };

    return (
        <Box sx={{ width: '100vw', height: '100vh', overflow: 'auto', padding: 0, fontFamily: 'Poppins, sans-serif' }}>
            <Box sx={{
                background: 'linear-gradient(150deg, rgba(180, 118, 210, 0.8) 0%, rgba(21, 101, 192, 0.8) 100%)',
                padding: 3,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0 0 20px 20px'
            }}>
                <Box sx={{
                    width: 500,
                    height: 500,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
                    position: 'absolute',
                    top: '-100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    filter: 'blur(50px)',
                    zIndex: 1
                }} />
                <Box component="img"
                     src="./images/header-main.png"
                     alt="Header Image"
                     sx={{
                         zIndex: 2,
                         width: '90%',
                         maxWidth: 800,
                         borderRadius: '20px',
                         position: 'relative',
                         margin: '0 auto',
                         top: 50
                     }}
                />
                <Typography variant="h3" sx={{
                    color: '#fff',
                    zIndex: 3,
                    position: 'relative',
                    top: 100,
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                    Easy And Fast Way To Rent Your Car
                </Typography>
            </Box>
            <Grid container spacing={3} sx={{ padding: 3 }}>
                <Grid item xs={12}>
                    <Centers onCenterClick={handleCenterClick} />
                </Grid>
            </Grid>
            <Dialog open={modalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Center Details
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Center center={selectedCenter} />
            </Dialog>
        </Box>
    );
};

export default VehicleRentLayout;
