const express = require('express');
const router = express.Router();
const Chat = require('../../../models/services/chat/Chat');
const User = require('../../../models/User');


router.get('/:chatId/messages', async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate('messages.sender', 'firstName lastName')
            .slice('messages', [(page - 1) * limit, limit]);

        res.json(chat ? chat.messages : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:chatId/messages/:messageId', async (req, res) => {
    const { content } = req.body;
    try {
        const chat = await Chat.findOneAndUpdate(
            { _id: req.params.chatId, "messages._id": req.params.messageId },
            { $set: { "messages.$.content": content, "messages.$.edited": true } },
            { new: true }
        );
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/:chatId/messages', async (req, res) => {
    const { senderId, content } = req.body;
    try {
        const chat = await Chat.findById(req.params.chatId);
        const message = { sender: senderId, content };
        chat.messages.push(message);
        chat.lastMessage = content;
        chat.lastMessageTime = Date.now();
        await chat.save();
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
