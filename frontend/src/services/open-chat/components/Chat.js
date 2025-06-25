import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Box, Typography, IconButton, TextField, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatList from './ChatWindow';
import ChatWindow from './ChatWindow';
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";

const socket = io('http://localhost:5000');

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const { user } = useAuthContext();
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch(`/api/chats/${user._id}`);
            const data = await response.json();
            setChats(data);
        };
        fetchChats();
    }, [user._id]);

    useEffect(() => {
        if (selectedChat) {
            socket.emit('joinChat', selectedChat._id);
            fetchMessages(selectedChat._id, 1);
        }

        return () => {
            if (selectedChat) {
                socket.emit('leaveChat', selectedChat._id);
            }
        };
    }, [selectedChat]);

    const fetchMessages = async (chatId) => {
        const response = await fetch(`/api/chats/${chatId}/messages`);
        const data = await response.json();
        setSelectedChat((prev) => ({
            ...prev,
            messages: data,
        }));
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { chatId: selectedChat._id, senderId: user._id, content: message });
            setSelectedChat((prev) => ({
                ...prev,
                messages: [...prev.messages, { sender: user._id, content: message }],
            }));
            setMessage("");
        }
    };

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setSelectedChat((prev) => ({
                ...prev,
                messages: [...prev.messages, message],
            }));
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <ChatList chats={chats} selectChat={setSelectedChat} />
            {selectedChat && (
                <>
                    <ChatWindow chat={selectedChat} chatContainerRef={chatContainerRef} />
                    <Box sx={{ display: 'flex', margin: 10,padding: 10, borderTop: '1px solid #ddd' }}>
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message"
                            sx={{ marginRight: 2 }}
                        />
                        <IconButton color="primary" onClick={sendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Chat;
