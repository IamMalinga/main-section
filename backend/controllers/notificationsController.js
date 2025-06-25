// notificationsController.js
const express = require('express');
const router = express.Router();

let notifications = []; // Temporary storage (use database in production)

// Add a new notification
router.post('/notifications/add-notification', (req, res) => {
    const { userId, message, type = 'info' } = req.body;
    if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and message are required' });
    }
    const notification = {
        id: Date.now(),
        userId,
        message,
        type,
        createdAt: new Date(),
    };
    notifications.push(notification);
    res.status(201).json(notification);
});

// Fetch notifications for a user
router.get('/notifications/notifications', (req, res) => {
    const { userId } = req.query;
    const userNotifications = notifications.filter((n) => n.userId === userId);
    res.status(200).json(userNotifications);
});

module.exports = router;
