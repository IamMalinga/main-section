import React, { useState, useContext, useEffect } from 'react';
import {
  Drawer,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Grid,
  Box,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon, Divider, ListItemText
} from '@mui/material';
import { TripContext } from '../../context/TripContext';
import { useAuthContext } from '../../authentication/hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import RoomIcon from '@mui/icons-material/Room';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RecommendationsIcon from '@mui/icons-material/Recommend';
import CloudIcon from '@mui/icons-material/Cloud';
import ChatIcon from '@mui/icons-material/Chat';
import CalculateIcon from '@mui/icons-material/Calculate';
import { v4 as uuidv4 } from 'uuid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TripPlanner = ({ stepsConfig }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { tripData, setTripData } = useContext(TripContext);
  const [openServicesDrawer, setOpenServicesDrawer] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const toggleServicesDrawer = (newOpen) => () => {
    setOpenServicesDrawer(newOpen);
  };

  const saveTripToDatabase = async () => {
    try {
      if (!user?.token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save trip data: ${errorText}`);
      }

      console.log('Trip data saved successfully');
      setSaveStatus('success');
    } catch (error) {
      console.error('Error saving trip data:', error);
      setSaveStatus('error');
    } finally {
      setOpenStatusDialog(true);
    }
  };

  const handleNext = () => {
    if (activeStep === stepsConfig.length - 1) {
      setOpenConfirmDialog(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleConfirmSave = async () => {
    setOpenConfirmDialog(false);
  
    if (!tripData.id) {
      const newTripData = { ...tripData, id: uuidv4() }; // Add unique id
      setTripData(newTripData);
      await saveTripToDatabase(newTripData); // Use the new tripData with the id
    } else {
      await saveTripToDatabase(tripData); // Use the existing tripData
    }
  };
  

  const handleStatusDialogClose = () => {
    setOpenStatusDialog(false);
    if (saveStatus === 'success') {
      navigate('/dashboard', { state: { scrollToBottom: true } });
    }
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => {
    localStorage.removeItem('trip');
    setTripData({
      destinations: [],
      people: '',
      friends: [],
      days: '',
      budget: ''
    });
    setActiveStep(0);
  };

  const updateTripData = (data) => setTripData((prevData) => ({ ...prevData, ...data }));



  const servicesDrawerList = (
      <Box sx={{ width: 350 }} role="presentation" onClick={toggleServicesDrawer(false)} onKeyDown={toggleServicesDrawer(false)}>
        <Typography sx={{ padding: 2 }} variant="h6">Services</Typography>
        <List>
          {[
            { text: 'Lost Items Reporting', icon: <RoomIcon />, path: '/services/lost-items' },
            { text: 'Public Transportation Details', icon: <DirectionsBusIcon />, path: '/services/public-transport' },
            { text: 'Lodging', icon: <HotelIcon />, path: '/services/lodging' },
            { text: 'Dining', icon: <RestaurantIcon />, path: '/services/dining' },
            { text: 'Recommendation System', icon: <RecommendationsIcon />, path: '/services/recommendations' }
          ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            { text: 'Weather Details', icon: <CloudIcon />, path: '/services/weather' },
            { text: 'Chat System', icon: <ChatIcon />, path: '/services/chat' },
            { text: 'Distance Calculation', icon: <CalculateIcon />, path: '/services/distance' }
          ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
          ))}
        </List>
      </Box>
  );

  return (
      <Box sx={{ width: '90vw', padding: '50px', marginTop: '10px' }}>
        <Grid container>
          <Grid item xs={12} md={3} sx={{ boxShadow: 0 }}>
            <Paper elevation={1} sx={{ boxShadow: 0 }}>
              <Stepper activeStep={activeStep} orientation="vertical" sx={{ boxShadow: 0 }}>
                {stepsConfig.map((step, index) => (
                    <Step key={index}>
                      <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} sx={{ mt: 0 }}>
            <Box sx={{ mt: 0 }}>
              {activeStep === stepsConfig.length ? (
                  <Box>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset}>Reset</Button>
                    <Grid container sx={{ mt: 0 }}>
                      <Grid item xs={12} md={6}>
                        <Card sx={{ maxWidth: 500 }} onClick={toggleServicesDrawer(true)}>
                          <CardActionArea>
                            <CardMedia
                                component='img'
                                src='/assets/services.jpg'
                                height='300'
                                alt='Service Section'
                            />
                            <CardContent sx={{ padding: 5 }}>
                              <Typography gutterBottom variant='h5' component='div'>
                                Services
                              </Typography>
                              <Typography variant='body2' color='text.secondary'>
                                Explore the service we have provided. There are more than 10 services provided here to make your travel life easier.
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    </Grid>
                    <Drawer open={openServicesDrawer} onClose={toggleServicesDrawer(false)} anchor='right'>
                      {servicesDrawerList}
                    </Drawer>
                  </Box>
              ) : (
                  <Box>
                    {stepsConfig[activeStep].component(tripData, updateTripData)}
                    <Box sx={{ mt: 1 }}>
                      <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                      </Button>
                      <Button variant="contained" onClick={handleNext}>
                        {activeStep === stepsConfig.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </Box>
                  </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Confirmation Dialog */}
        <Dialog
            open={openConfirmDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpenConfirmDialog(false)}
            aria-describedby="confirm-save-description"
        >
          <DialogTitle>{"Save Trip to Database?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-save-description">
              Do you want to save your trip details to the database? You can still make changes later.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmSave}>Save</Button>
          </DialogActions>
        </Dialog>

        {/* Status Dialog */}
        <Dialog
            open={openStatusDialog}
            onClose={handleStatusDialogClose}
            aria-describedby="save-status-description"
        >
          <DialogTitle>{saveStatus === 'success' ? "Success" : "Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="save-status-description">
              {saveStatus === 'success'
                  ? "Your trip was saved successfully."
                  : "There was an error saving your trip. Please try again."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleStatusDialogClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default TripPlanner;
