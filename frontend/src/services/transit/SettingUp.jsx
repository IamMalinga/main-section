import { Box, TextField, Grid, ToggleButton, ToggleButtonGroup, InputAdornment, Typography, Button } from "@mui/material";
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import DirectionsSubwaySharpIcon from '@mui/icons-material/DirectionsSubwaySharp';
import BallotSharpIcon from '@mui/icons-material/BallotSharp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useState } from "react";

const SettingUp = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [toggleValue, setToggleValue] = useState('left');

  const handleTimeChange = (newValue) => {
    setSelectedTime(newValue);
  };

  const handleToggleChange = (event, newToggleValue) => {
    setToggleValue(newToggleValue);
  };

  return (
    <Box sx={{
      height: 'auto',
      maxWidth: '800px',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      margin: 'none',
    }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'left', mb: 4, fontWeight: 'bold', color: '#333' }}>
        Setting Up
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="from-field"
                label="From"
                placeholder="Enter start location"
                multiline
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="to-field"
                label="To"
                placeholder="Enter destination"
                multiline
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ArrowForwardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={3} md={2}>
          <ToggleButtonGroup
            orientation="vertical"
            value={toggleValue}
            exclusive
            onChange={handleToggleChange}
            fullWidth
          >
            <ToggleButton value="left" sx={{ borderRadius: '12px', padding: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <BallotSharpIcon />
            </ToggleButton>
            <ToggleButton value="center" sx={{ borderRadius: '12px', padding: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <DirectionsBusFilledIcon />
            </ToggleButton>
            <ToggleButton value="right" sx={{ borderRadius: '12px', padding: '12px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <DirectionsSubwaySharpIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} sm={6} md={5}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={handleTimeChange}
              renderInput={(params) => <TextField {...params} fullWidth variant="outlined" size="small" sx={{ backgroundColor: '#fff', borderRadius: '8px' }} />}
            />
          </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
          <TextField
                id="from-field"
                label="Approximity"
                placeholder="Enter start location"
                multiline
                fullWidth
                variant="outlined"
                size="small"
                sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SettingUp;
