import React from "react";
import { ListItem, ListItemText, Typography, Box } from "@mui/material";

const NotificationItem = ({ notification }) => {
  return (
    <ListItem
      sx={{
        backgroundColor: notification.isRead ? "#f9f9f9" : "#e3f2fd",
        borderRadius: "8px",
        mb: 1,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: 2,
      }}
    >
      <Box>
        <Typography
          variant="body1"
          sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "bold" }}
        >
          {notification.message}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: "Poppins, sans-serif", color: "#6c757d" }}
        >
          {new Date(notification.createdAt).toLocaleString()}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default NotificationItem;
