import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Services = () => {
  return (
    <Box>
      <Outlet />
      </Box>
    
  );
};

export default Services;
