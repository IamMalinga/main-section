import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import GroupIcon from '@mui/icons-material/Group';
import FlightIcon from '@mui/icons-material/Flight';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const iconStyle = { fontSize: '3rem', color: '#1976d2' };

const featureList = [
  {
    icon: <AddLocationIcon sx={iconStyle} />,
    title: 'Add places from guides with 1 click',
    description: 'We crawled the web so you don’t have to. Easily save mentioned places.'
  },
  {
    icon: <GroupIcon sx={iconStyle} />,
    title: 'Collaborate with friends in real time',
    description: 'Plan along with your friends with live syncing and collaborative editing.'
  },
  {
    icon: <FlightIcon sx={iconStyle} />,
    title: 'Import flight and hotel reservations',
    description: 'Connect or forward your emails to get them magically added into your trip plan.'
  },
  {
    icon: <AttachMoneyIcon sx={iconStyle} />,
    title: 'Expense tracking and splitting',
    description: 'Keep track of your budget and split the cost with your travel mates.'
  },
  {
    icon: <ChecklistIcon sx={iconStyle} />,
    title: 'Checklists for anything',
    description: 'Stay organized with a packing list, to-do list, and itinerary.'
  },
  {
    icon: <LightbulbIcon sx={iconStyle} />,
    title: 'Get personalized suggestions',
    description: 'Find the best places to visit with smart recommendations based on your preferences.'
  }
];

const Features = () => (
  <Box sx={{ py: 5, textAlign: 'center' }}>
    <Typography variant="h4" sx={{ mb: 4 }}>Features to replace all your other tools</Typography>
    <Grid container spacing={4} justifyContent="center">
      {featureList.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {feature.icon}
              <Typography variant="h6" sx={{ mt: 2 }}>{feature.title}</Typography>
              <Typography sx={{ mt: 1, maxWidth: '300px' }}>{feature.description}</Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Features;
