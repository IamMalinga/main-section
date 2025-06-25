import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';

const RegistrationForm = ({ supplierData, setSupplierData, detailedUser, onSubmit }) => {
    const [autocomplete, setAutocomplete] = useState(null);

    const handleAutocompleteLoad = (instance) => setAutocomplete(instance);

    const handlePlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            const locationName = place.formatted_address || place.name;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setSupplierData((prev) => ({
                ...prev,
                location: { name: locationName, lat, lng },
                profilePic: detailedUser.profilePic,
            }));
        }
    };

    const handleArrayFieldChange = (field, value) => {
        const arrayValues = value.split(',').map((item) => item.trim());
        setSupplierData((prev) => ({
            ...prev,
            [field]: arrayValues,
        }));
    };

    useEffect(() => {
        console.log('Detailed User Data:', detailedUser);
    }, [detailedUser]);

    return (
        <Box
            sx={{
                backgroundColor: '#f9f9f9',
                p: 4,
                borderRadius: 4,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 3,
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    color: '#1a73e8',
                }}
            >
                Supplier Registration Form
            </Typography>

            <TextField
                label="Name"
                fullWidth
                value={`${detailedUser?.firstName || ''} ${detailedUser?.lastName || ''}`}
                disabled
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                        color: '#444',
                    },
                }}
            />

            <TextField
                label="Contact"
                fullWidth
                value={detailedUser?.email || ''}
                disabled
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                        color: '#444',
                    },
                }}
            />

            <Autocomplete onLoad={handleAutocompleteLoad} onPlaceChanged={handlePlaceChanged}>
                <TextField
                    label="Location"
                    fullWidth
                    placeholder="Enter or select your location"
                    value={supplierData?.location?.name || ''}
                    onChange={(e) =>
                        setSupplierData((prev) => ({
                            ...prev,
                            location: { ...prev.location, name: e.target.value },
                        }))
                    }
                    sx={{
                        mb: 3,
                        '& .MuiInputBase-root': {
                            fontFamily: 'Poppins, sans-serif',
                        },
                    }}
                />
            </Autocomplete>

            <TextField
                label="Bio"
                fullWidth
                multiline
                rows={3}
                placeholder="Tell us about yourself"
                value={supplierData?.bio || ''}
                onChange={(e) => setSupplierData({ ...supplierData, bio: e.target.value })}
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                }}
            />

            <TextField
                label="Price Per Day (USD)"
                fullWidth
                type="number"
                placeholder="Enter your price per day"
                value={supplierData?.pricePerDay || ''}
                onChange={(e) => setSupplierData({ ...supplierData, pricePerDay: e.target.value })}
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                }}
            />

            <TextField
                label="Experience (Years)"
                fullWidth
                type="number"
                placeholder="Enter your years of experience"
                value={supplierData?.experienceYears || ''}
                onChange={(e) => setSupplierData({ ...supplierData, experienceYears: e.target.value })}
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                }}
            />

            <TextField
                label="Languages (Comma-separated)"
                fullWidth
                placeholder="E.g., English, Spanish, French"
                value={supplierData?.languages?.join(', ') || ''}
                onChange={(e) => handleArrayFieldChange('languages', e.target.value)}
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                }}
            />

            <TextField
                label="Specialties (Comma-separated)"
                fullWidth
                placeholder="E.g., Adventure, Cultural Tours, Nature"
                value={supplierData?.specialties?.join(', ') || ''}
                onChange={(e) => handleArrayFieldChange('specialties', e.target.value)}
                sx={{
                    mb: 3,
                    '& .MuiInputBase-root': {
                        fontFamily: 'Poppins, sans-serif',
                    },
                }}
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onSubmit}
                sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 'bold',
                    backgroundColor: '#1a73e8',
                    ':hover': { backgroundColor: '#1565c0' },
                }}
            >
                Submit
            </Button>
        </Box>
    );
};

export default RegistrationForm;
