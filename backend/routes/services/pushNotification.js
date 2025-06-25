// services/pushNotification.js
const { Expo } = require('expo-server-sdk');
let expo = new Expo();

const sendPushNotification = async (tokens, messageData) => {
    let messages = [];
    for (let token of tokens) {
        if (!Expo.isExpoPushToken(token)) {
            console.error(`Push token ${token} is not a valid Expo push token`);
            continue;
        }

        messages.push({
            to: token,
            sound: 'default',
            title: messageData.title,
            body: messageData.body,
            data: { ...messageData },
        });
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    for (let chunk of chunks) {
        try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = { sendPushNotification };
