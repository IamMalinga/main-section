import { Box, Fab, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import ProfileModel from '../components/ProfileModel';
import Person2Icon from '@mui/icons-material/Person2';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import ChatModel from '../components/ChatModel';
import AddPostModel from '../components/AddPostModel';
import AddShortModel from '../components/AddShortModel';
import { useNavigate } from 'react-router-dom'; 

const SettingsPage = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openAddShort, setOpenAddShort] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const fabStyles = {
    background: 'linear-gradient(145deg, #0a1929, #122840)',
    color: '#ffffff',
    '&:hover': {
      background: 'linear-gradient(145deg, #1c3b5a, #0a1929)',
    },
    boxShadow: '0px 4px 15px rgba(0,0,0,0.3)',
  };

  const handleAddPostClick = () => {
    navigate('/services/open-chat/addpost');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px',
        gap: '20px',
      }}
    >
      <Tooltip title="View Profile" placement="right" arrow>
        <Fab
          sx={fabStyles}
          aria-label="profile"
          onClick={() => setOpenProfile(true)}
        >
          <Person2Icon />
        </Fab>
      </Tooltip>

      <Tooltip title="Open Chat" placement="right" arrow>
        <Fab
          sx={fabStyles}
          aria-label="chat"
          onClick={() => setOpenChat(true)}
        >
          <ChatIcon />
        </Fab>
      </Tooltip>

      <Tooltip title="Add Post" placement="right" arrow>
        <Fab
          sx={fabStyles}
          aria-label="add post"
          onClick={handleAddPostClick} 
        >
          <HistoryEduIcon />
        </Fab>
      </Tooltip>

      <Tooltip title="Add Short" placement="right" arrow>
        <Fab
          sx={fabStyles}
          aria-label="add short"
          onClick={() => setOpenAddShort(true)}
        >
          <SwitchAccessShortcutAddIcon />
        </Fab>
      </Tooltip>

      <Tooltip title="Edit Settings" placement="right" arrow>
        <Fab sx={fabStyles} aria-label="edit">
          <EditIcon />
        </Fab>
      </Tooltip>

      {/* Modals */}
      <ProfileModel open={openProfile} handleClose={() => setOpenProfile(false)} />
      <ChatModel open={openChat} handleClose={() => setOpenChat(false)} />
      <AddShortModel open={openAddShort} handleClose={() => setOpenAddShort(false)} />
    </Box>
  );
};

export default SettingsPage;
