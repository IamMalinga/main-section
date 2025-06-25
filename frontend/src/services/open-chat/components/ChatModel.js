import React, { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Modal,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import SearchUsersDialog from './SearchUsersDialog';
import { fetchChats, startChat, fetchMessages, sendMessage } from '../api';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';

const style = {
  position: 'absolute',
  top: '0%',
  right: '0%',
  width: '55vw',
  height: '100vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'hidden',
  display: 'flex',
};

const ChatModel = ({ open, handleClose, initialUser }) => {
  const { user } = useAuthContext();
  const [chats, setChats] = useState([]);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, [chats])

  // Fetch all chats when the modal opens
  useEffect(() => {
    const loadChats = async () => {
      if (!open) return;
      setLoading(true);
      try {
        const chatData = await fetchChats(user.token);
        setChats(chatData || []);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, [open, user.token]);

  // Handle creating or selecting a chat for the initial user
  useEffect(() => {
    const handleInitialUser = async () => {
      if (initialUser) {
        const existingChat = chats.find((chat) =>
          chat?.participants?.some((participant) => participant._id === initialUser._id)
        );

        if (existingChat) {
          // Select the existing chat
          const index = chats.indexOf(existingChat);
          setSelectedChatIndex(index);
          const chatMessages = await fetchMessages(existingChat._id, user.token);
          setMessages(chatMessages);
        }
        else if (!chats.some((chat) => chat._id === initialUser._id)) {
          // Create a new chat only if it doesn't already exist
          try {
            console.log("New chat created 1")
            const newChat = await startChat(initialUser._id, user.token);
            setChats((prevChats) => [newChat, ...prevChats]);
            setSelectedChatIndex(0); // Select the newly created chat
            setMessages([]);
          } catch (error) {
            console.error('Error creating chat:', error);
          }
        }
      }
    };
    

    handleInitialUser();
  }, [initialUser, chats, user.token]);

  // Handle selecting a chat from the chat list
  const selectChat = async (chat, index) => {
    setSelectedChatIndex(index);
    try {
      const chatMessages = await fetchMessages(chat._id, user.token);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle starting a chat via the search dialog
  const handleStartChat = async (participant) => {
    const existingChat = chats.find((chat) =>
      chat?.participants?.some((p) => p._id === participant._id)
    );

    if (existingChat) {
      const index = chats.indexOf(existingChat);
      setSelectedChatIndex(index);
      const chatMessages = await fetchMessages(existingChat._id, user.token);
      setMessages(chatMessages);
    } else {
      try {
        console.log("New chat created 2")
        const newChat = await startChat(participant._id, user.token);
        setChats((prevChats) => [newChat, ...prevChats]);
        setSelectedChatIndex(0);
        setMessages([]);
        setSearchDialogOpen(false);
      } catch (error) {
        console.error('Error starting chat:', error);
      }
    }
  };

  // Handle sending a message
  const handleSendMessage = async (chatId, content) => {
    try {
      const newMessage = await sendMessage(chatId, content, user.token);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChats((prevChats) =>
        prevChats.map((c) =>
          c._id === chatId ? { ...c, lastMessage: content, lastMessageTime: new Date() } : c
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box sx={{ width: '300px', borderRight: '1px solid #ddd' }}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Chats
              </Typography>
              <IconButton color="inherit" onClick={() => setSearchDialogOpen(true)}>
                <AddIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <ChatList chats={chats} selectChat={(chat, index) => selectChat(chat, index)} />
          )}
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {selectedChatIndex !== null && chats[selectedChatIndex] ? (
            <ChatWindow
              chat={chats[selectedChatIndex]}
              messages={messages}
              setMessages={setMessages}
              sendMessage={handleSendMessage}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography>Select a chat to start the conversation</Typography>
            </Box>
          )}
        </Box>

        <SearchUsersDialog
          open={searchDialogOpen}
          handleClose={() => setSearchDialogOpen(false)}
          startChat={handleStartChat}
        />
      </Box>
    </Modal>
  );
};

export default ChatModel;
