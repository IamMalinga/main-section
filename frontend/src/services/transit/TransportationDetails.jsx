import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Grid, Box, Divider } from '@mui/material';
import BusIcon from '@mui/icons-material/DirectionsBus';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
  boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

function TransportationDetails(props) {
  const { window, toggleDrawer, open, selectedItem } = props;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <SwipeableDrawer
      container={container}
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <StyledBox
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
          padding: 2,
        }}
      >
        <Puller />
        <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {selectedItem ? selectedItem.title : 'Loading...'}
        </Typography>
      </StyledBox>
      <StyledBox
        sx={{
          px: 3,
          pb: 3,
          pt: 5,
          height: '100%',
          overflow: 'auto',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        {selectedItem ? (
          <>
            <Typography variant="h6" gutterBottom>
              {selectedItem.title}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {selectedItem.description}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <IconWrapper>
              <BusIcon color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Bus Number: {selectedItem.busNumber}
              </Typography>
            </IconWrapper>
            <IconWrapper>
              <AccessTimeIcon color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Time: {selectedItem.time.start} - {selectedItem.time.end}
              </Typography>
            </IconWrapper>
            <IconWrapper>
              <PhoneIcon color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Hotline: {selectedItem.hotline}
              </Typography>
            </IconWrapper>
          </>
        ) : (
          <Skeleton variant="rectangular" height="100%" />
        )}
      </StyledBox>
    </SwipeableDrawer>
  );
}

export default TransportationDetails;
