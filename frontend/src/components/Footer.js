import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const FooterIcon = styled('div')(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Travel Planner</Typography>
            <Typography variant="body2">
              Discover, Explore, Wander. Experience the beauty of Sri Lanka.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <ul>
              <li><a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a></li>
              <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a></li>
              <li><a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Follow Us</Typography>
            <FooterIcon><Facebook /></FooterIcon>
            <FooterIcon><Twitter /></FooterIcon>
            <FooterIcon><Instagram /></FooterIcon>
          </Grid>
        </Grid>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
