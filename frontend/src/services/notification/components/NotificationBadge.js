import React from "react";
import { IconButton, Badge, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";


const NotificationBadge = ({ count, onClick }) => {
  return (
    <Box sx={{ bgcolor: 'black', borderRadius: '50%', padding: 5}}>
    <IconButton color="primary" onClick={onClick}>
      <Badge badgeContent={count} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    </Box>
  );
};

export default NotificationBadge;
