import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import DestinationStep from '../components/DestinationStep';
import PeopleStep from '../components/PeopleStep';
import DaysStep from '../components/DaysStep';
import BudgetStep from '../components/BudgetStep';
import ServicesStep from '../components/ServicesStep';

const steps = ['Add Destinations', 'Number of People & Invite Friends', 'Number of Days', 'Budget'];

const TripPlanner = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tripData, setTripData] = useState({
    destinations: [],
    people: '',
    friends: [],
    days: '',
    budget: ''
  });

  console.log(tripData)

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  const updateTripData = (data) => setTripData((prevData) => ({ ...prevData, ...data }));

  const getStepContent = (step, tripData, updateTripData) => {
    switch (step) {
      case 0:
        return <DestinationStep tripData={tripData} updateTripData={updateTripData} />;
      case 1:
        return <PeopleStep tripData={tripData} updateTripData={updateTripData} />;
      case 2:
        return <DaysStep tripData={tripData} updateTripData={updateTripData} />;
      case 3:
        return <BudgetStep tripData={tripData} updateTripData={updateTripData} />;
      default:
        return 'Unknown step';
    }
  };
  

  return (
    <Box sx={{ width: '100%', padding: '16px', marginTop: '64px' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {activeStep === steps.length ? (
          <Box>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        ) : (
          <Box >
            {getStepContent(activeStep, tripData, updateTripData)}
            <Box sx={{ mt: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TripPlanner;
