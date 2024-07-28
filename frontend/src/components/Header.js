import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)(({ theme, scrollPosition }) => ({
  backgroundColor: scrollPosition > 100 ? theme.palette.primary.main : 'transparent',
  transition: 'background-color 0.5s',
}));

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledAppBar position="fixed" scrollPosition={scrollPosition}>
      <Toolbar color="primary">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Travel Planner
        </Typography >
        <Button color="inherit">Home</Button>
        <Button color="inherit">Travel Guides</Button>
        <Button color="inherit">Hotels</Button>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
