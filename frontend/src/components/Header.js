import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import WorkIcon from '@mui/icons-material/Work';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CancelIcon from '@mui/icons-material/Cancel'
import LogoutIcon from '@mui/icons-material/Logout';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useAuthContext } from '../authentication/hooks/useAuthContext';
import { useLogout } from '../authentication/hooks/useLogout';
import Logo from '../assets/Logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#033363',
    },
  },
});

const pages = ['Navigation', 'About', 'Contact'];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    setLogoutDialogOpen(false);
    navigate('/login');
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: '#033363' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                padding: 1.5,
                width: '10%',
                height: 'auto',
                borderRadius: 2,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            />

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                    }}
                  >
                    <NavLink
                      to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Typography textAlign="center">{page}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    navigate(page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`);
                    handleCloseNavMenu();
                  }}
                  sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, borderRadius: '50%' }}
                  >
                    <Avatar
                      alt={user.name}
                      src={user.profilePic || '/static/images/avatar/2.jpg'}
                      sx={{
                        border: '2px solid',
                        borderColor: '#fff',
                      }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '45px',
                    '& .MuiPaper-root': {
                      borderRadius: '10px', // Slightly rounded corners for a modern look
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)', // Enhanced shadow for a clean modern look
                      minWidth: '280px', // Slightly wider for better readability
                      bgcolor: '#ffffff', // White background
                      fontFamily: 'Quicksand, sans-serif', // Modern font
                    },
                    '& .MuiMenuItem-root': {
                      transition: 'all 0.2s ease-in-out',
                      padding: '20px 30px', // Adjust padding for a spacious feel
                      borderRadius: '6px', // Rounded corners for hover effect
                      '&:hover': {
                        bgcolor: '#e3f2fd', // Subtle hover background with a blue tint
                        transform: 'translateX(6px)', // Smooth hover animation
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Add slight elevation on hover
                      },
                      '& .MuiListItemIcon-root': {
                        color: '#033363', // Vibrant blue color for icons
                      },
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => navigate('/profile')}>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#000' }}>Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/mytrip')}>
                    <ListItemIcon>
                      <TravelExploreIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#000' }}>My Trip</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/dashboard')}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#000' }}>Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/supplier')}>
                    <ListItemIcon>
                      <WorkIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#000' }}>Become a Supplier</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/bucket')}>
                    <ListItemIcon>
                      <ShoppingBasketIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#000' }}>My Bucket</Typography>
                  </MenuItem>
                  <Divider sx={{ my: 1, bgcolor: '#e0e0e0' }} />
                  <MenuItem onClick={() => setLogoutDialogOpen(true)}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#d32f2f' }}>Logout</Typography>
                  </MenuItem>
                </Menu>



              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: 2,
            maxWidth: '30vw',
            backgroundColor: '#ffffff',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
            border: '1px solid #E0E0E0',
          },
        }}
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            fontWeight: 'bold',
            fontSize: '1.5rem',
            fontFamily: 'Quicksand, Arial, sans-serif',
            color: '#033363',
            textAlign: 'center',
          }}
        >
          <LogoutIcon sx={{ color: '#033363', fontSize: '2rem' }} />
          Confirm Logout
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 3,
            marginTop: 2,
          }}
        >
          <DialogContentText
            id="logout-dialog-description"
            sx={{
              fontSize: '1.0rem',
              fontFamily: 'Poppins, Arial, sans-serif',
              color: '#555555',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to log out? You will be logged out of your account and need to log in again to continue.
          </DialogContentText>
          <Avatar
            sx={{
              backgroundColor: '#033363',
              color: '#fff',
              width: 80,
              height: 80,
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }}
          >
            <LogoutIcon fontSize="large" />
          </Avatar>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button
            onClick={handleLogoutDialogClose}
            startIcon={<CancelIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#FFFFFF',
              backgroundColor: '#E57373',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#D32F2F',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#FFFFFF',
              backgroundColor: '#033363',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#0056B3',
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>



    </ThemeProvider>
  );
}

export default Header;
