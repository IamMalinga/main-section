import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import moment from 'moment'; // For formatting timestamps
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';
import ChatHeader from './ChatHeader';

const socket = io('http://localhost:5000/chat');

const ChatWindow = ({ chat, messages, setMessages, sendMessage }) => {
  const [message, setMessage] = useState('');
  const [lastMessage, setLastMessage] = useState(''); // Track the last sent message
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false); // Track typing state
  const [isOnline, setIsOnline] = useState(false);
  const { user } = useAuthContext();
  const receiver = chat?.participants?.find((participant) => participant?._id !== user?._id);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Join and leave the chat room
  useEffect(() => {
    if (chat) {
      socket.emit('joinChat', chat._id?.toString());
      socket.emit('userOnline', { userId: user._id });

      // Listen for online/offline status updates
      socket.on('updateStatus', ({ userId, isOnline }) => {
        if (userId === chat.participants.find((p) => p._id !== user._id)?._id) {
          setIsOnline(isOnline);
        }
      });
    }

    

    return () => {
      if (chat) {
        socket.emit('leaveChat', chat._id?.toString());
      }
    };
  }, [chat, message]);

  const messageIds = new Set(messages.map((msg) => msg._id));

  // Listen for new messages from the server
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
        
        if (
          newMessage.chatId?.toString() === chat._id?.toString() &&
          newMessage.sender?._id?.toString() !== user._id?.toString() &&
          !messageIds.has(newMessage._id)
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
        
    };

    const handleTypingEvent = (data) => {
        if (
          data.chatId === chat._id?.toString() &&
          data.userId !== user._id // Only show typing if it's not the current user
        ) {
          setIsTyping(data.isTyping);
        }
      };
  

    socket.on('newMessage', handleNewMessage);
    socket.on('typing', handleTypingEvent);
    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('typing', handleTypingEvent);
    };
  }, [chat,message, user._id]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim() && message !== lastMessage) {
      // Send the message to the server via socket
      socket.emit('sendMessage', { chatId: chat?._id?.toString(), content: message });

      // Update the message list locally by calling the sendMessage prop
      sendMessage(chat._id?.toString(), message);

      // Update the last message state
      setLastMessage(message);

      // Clear the input field
      setMessage('');
    }
  };

    // Emit typing events
    const handleTyping = () => {
        socket.emit('typing', { chatId: chat._id.toString(), userId: user._id, isTyping: true });
        setTimeout(() => {
          socket.emit('typing', { chatId: chat._id.toString(), userId: user._id, isTyping: false });
        }, 3000); // Typing stops after 3 seconds of inactivity
      };
    



  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'linear-gradient(145deg, #f0f4f8, #ffffff)',
      }}
    >
          {/* Chat Header */}
      <ChatHeader
      isTyping={isTyping}
      isOnline={isOnline}
        chat={{
          participants: [receiver], // Pass only the receiver's details to the header
          isOnline: receiver?.isOnline, // Add isOnline dynamically if available
        }}
      />
      {/* Message List */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: 2,
          backgroundColor: '#f9fbfc',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender?._id === user._id ? 'flex-end' : 'flex-start',
              marginBottom: 2,
            }}
          >
            <Typography
              sx={{
                backgroundColor: msg.sender?._id === 'me' ? '#4caf50' : '#e0e0e0',
                padding: '8px 12px',
                borderRadius: '12px',
                color: msg.sender === 'me' ? '#fff' : '#000',
                maxWidth: '70%',
                wordBreak: 'break-word',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              {msg.content}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                marginTop: '4px',
                color: '#757575',
                fontSize: '0.8rem',
                textAlign: msg.sender === 'me' ? 'right' : 'left',
              }}
            >
              {moment(msg.timestamp).format('h:mm A')} {/* Display message time */}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Field */}
      <Box
        sx={{
          padding: 1.5,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderTop: '1px solid #ddd',
        }}
      >
        <TextField
          fullWidth
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
        }}
          placeholder="Type a message..."
          variant="outlined"
          sx={{
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton
          onClick={handleSendMessage}
          color="primary"
          sx={{
            marginLeft: 1,
            backgroundColor: '#4caf50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#388e3c',
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWindow;
