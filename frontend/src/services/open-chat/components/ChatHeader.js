import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';

const ChatHeader = ({ chat, isTyping, isOnline   }) => {
  const lastLogin = chat.lastMessageTime;
  const { user } = useAuthContext();

  // Find the participant who is not the current user
  const otherParticipant = chat?.participants?.find((participant) => participant?._id !== user?._id);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Avatar src={otherParticipant?.profilePic} sx={{ marginRight: 2 }} />
      <Box>
        <Typography variant="h6">
          {`${otherParticipant?.firstName || 'Unknown'} ${otherParticipant?.lastName || ''}`}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {isTyping ? 'Typing...' : isOnline ? 'Online' : 'Offline'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatHeader;
