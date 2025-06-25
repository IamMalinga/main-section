const { Chat, Message } = require('../../../models/services/chat/Chat');
const mongoose = require('mongoose');


exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.user._id })
            .populate('participants', 'firstName lastName profilePic')
            .sort({ updatedAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats' });
    }
};


exports.startChat = async (req, res) => {
    const { participantId } = req.body;
    try {
        const existingChat = await Chat.findOne({
            participants: { $all: [req.user._id, participantId] },
        }).populate('participants', 'firstName lastName profilePic');

        if (existingChat) return res.json(existingChat);

        const newChat = new Chat({
            participants: [req.user._id, participantId],
        });

        const savedChat = await newChat.save();
        const populatedChat = await savedChat.populate('participants', 'firstName lastName profilePic');

        const io = req.app.get("io");
        io.of("/chat").emit("newChat", chat);

        res.status(201).json(populatedChat);
    } catch (error) {
        res.status(500).json({ error: 'Failed to start chat' });
    }
};



exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId })
            .populate('sender', 'firstName lastName profilePic')
            .sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};


exports.sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return res.status(400).json({ error: 'Invalid chatId' });
        }


        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Message content is required' });
        }

        const newMessage = new Message({
            chatId,
            sender: req.user._id,
            content,
        });

        const savedMessage = await newMessage.save();

        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: content,
            lastMessageTime: Date.now(),
        });

        const populatedMessage = await savedMessage.populate('sender', 'firstName lastName profilePic');

        const io = req.app.get('io');
        io.of('/chat').to(chatId).emit('newMessage', populatedMessage);

        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
};

