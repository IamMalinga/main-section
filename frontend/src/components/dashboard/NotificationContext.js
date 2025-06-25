import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();



export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Add a new notification
    const addNotification = async (message, type = 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Call backend to persist notification
        try {
            await fetch('/api/notifications/add-notification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: '123', message, type }), // Replace '123' with actual userId
            });
        } catch (error) {
            console.error('Error adding notification:', error);
        }

        // Auto-remove notification after 5 seconds
        setTimeout(() => removeNotification(id), 5000);
    };

    // Remove a notification
    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};


export const useNotification = () => useContext(NotificationContext);