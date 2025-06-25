import React from 'react';
import { List, ListItemButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';

const ChatList = ({ chats = [], selectChat }) => {
  const { user } = useAuthContext();

  return (
    <List>
      {chats.length > 0 ? (
        chats.map((chat, index) => {
          // Safely check for participants and filter out the current user
          const otherParticipant =
            chat?.participants?.find((participant) => participant?._id !== user?._id) || {};

          return (
            <ListItemButton key={chat._id} onClick={() => selectChat(chat, index)}>
              <ListItemAvatar>
                <Avatar
                  src={otherParticipant?.profilePic}
                  alt={otherParticipant?.firstName || 'Unknown'}
                />
              </ListItemAvatar>
              <ListItemText
                primary={otherParticipant?.firstName || 'Unknown'}
                secondary={chat?.lastMessage || 'Start a conversation'}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItemButton>
          );
        })
      ) : (
        <ListItemText primary="No chats available" />
      )}
    </List>
  );
};

export default ChatList;
