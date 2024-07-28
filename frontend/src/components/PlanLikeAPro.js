import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DirectionsIcon from '@mui/icons-material/Directions';

const iconStyle = { fontSize: '3rem', color: '#1976d2' };

const featureData = [
  {
    icon: <OfflineBoltIcon sx={iconStyle} />,
    title: 'Offline access',
    description: 'No wifi, no problem. Your trip plans are locally downloaded for access anywhere.'
  },
  {
    icon: <AttachFileIcon sx={iconStyle} />,
    title: 'Unlimited attachments',
    description: 'Never dig through your emails again — access all your trip files and PDFs in one place.'
  },
  {
    icon: <DirectionsIcon sx={iconStyle} />,
    title: 'Optimize your route',
    description: 'Perfect for road trips and saving $$$ on gas! Get the best route auto-rearranged.'
  }
];

const PlanLikePro = () => (
  <Box sx={{ py: 5, bgcolor: '#f0f0f0', textAlign: 'center' }}>
    <Typography variant="h4" sx={{ mb: 4 }}>Plan like a Pro</Typography>
    <Typography sx={{ mb: 4 }}>Unlock premium features like offline access, unlimited attachments, flight deals, export to Google maps, and much more.</Typography>
    <Grid container spacing={4} justifyContent="center">
      {featureData.map((feature, index) => (
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

export default PlanLikePro;
