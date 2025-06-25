import React, { useEffect, useState } from "react";
import { List, Typography } from "@mui/material";
import NotificationItem from "./NotificationItem";
import { fetchNotifications } from "../Notification";

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await fetchNotifications(userId);
        setNotifications(response || []); // Ensure response is always an array
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]); // Set as an empty array on error
      }
    };
    loadNotifications();
  }, [userId]);

  return (
    <List>
      {notifications && notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification._id} notification={notification} />
        ))
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            color: "#6c757d",
          }}
        >
          No notifications yet.
        </Typography>
      )}
    </List>
  );
};

export default NotificationList;
