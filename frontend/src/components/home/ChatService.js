import React, { useRef } from 'react';
import { Box, Grid, Typography, Card, CardContent, CardActionArea, Container } from '@mui/material';
import { styled } from '@mui/system';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { motion, useInView } from 'framer-motion';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ fontSize: 60, color: '#4caf50' }} />,
    title: 'Personalized Itineraries',
    description: 'Our app creates personalized trip itineraries based on your preferences and interests.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ fontSize: 60, color: '#ff9800' }} />,
    title: 'Real-Time Updates',
    description: 'Stay informed with real-time updates on weather, traffic, and more during your travels.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ fontSize: 60, color: '#2196f3' }} />,
    title: 'Easy Navigation',
    description: 'Navigate effortlessly with detailed maps and directions for every stop on your journey.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ fontSize: 60, color: '#9c27b0' }} />,
    title: 'Recommendations',
    description: 'Receive tailored recommendations for lodging, dining, and activities at every destination.',
  },
  {
    icon: <SupportAgentRoundedIcon sx={{ fontSize: 60, color: '#e91e63' }} />,
    title: '24/7 Support',
    description: 'Access our customer support team anytime, anywhere for help with your travel plans.',
  },
  {
    icon: <QueryStatsRoundedIcon sx={{ fontSize: 60, color: '#00bcd4' }} />,
    title: 'Budget Optimization',
    description: 'Optimize your travel budget with cost-effective suggestions and money-saving tips.',
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(145deg, #1f1f1f, #292929)',
  color: 'white',
  minHeight: '230px',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
  },
}));

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function ChatService() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <Box
      id="highlights"
      ref={sectionRef}
      sx={{
        pt: { xs: 6, sm: 12 },
        pb: { xs: 6, sm: 16 },
        bgcolor: '#033378',
        width: '100vw',
        position: 'relative',
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 6 },
        }}
      >
        {/* Title Section */}
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontFamily: 'Quicksand, Arial, sans-serif',
              fontWeight: 'bold',
              color: '#ffffff',
              mb: 2,
            }}
          >
            Why Choose Our Trip Planner?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Quicksand, Arial, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '1rem',
              lineHeight: 1.8,
            }}
          >
            Discover the unique features that make our trip planning app the perfect companion for
            your travels in Sri Lanka. Enjoy a seamless experience with personalized itineraries,
            real-time updates, and expert recommendations.
          </Typography>
        </Box>

        {/* Features Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={4}>
            {items.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={cardVariants}>
                  <StyledCard>
                    <CardActionArea>
                      <CardContent
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          gap: 2,
                        }}
                      >
                        <Box>{item.icon}</Box>
                        <Typography
                          gutterBottom
                          variant="h5"
                          sx={{
                            fontFamily: 'Quicksand, Arial, sans-serif',
                            fontWeight: 'bold',
                            color: '#ffffff',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'Quicksand, Arial, sans-serif',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}
