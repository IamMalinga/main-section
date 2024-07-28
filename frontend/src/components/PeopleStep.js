import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PeopleStep = ({ tripData, updateTripData }) => {
  const [friend, setFriend] = useState('');

  const handleAddFriend = () => {
    const newFriends = [...tripData.friends, friend];
    updateTripData({ friends: newFriends });
    setFriend('');
  };

  const handleRemoveFriend = (friendToRemove) => {
    const newFriends = tripData.friends.filter((f) => f !== friendToRemove);
    updateTripData({ friends: newFriends });
  };

  return (
    <Box p={2}>
      <Typography variant="h5">Number of People & Invite Friends</Typography>
      <TextField
        label="Number of People"
        value={tripData.people}
        onChange={(e) => updateTripData({ people: e.target.value })}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Invite Friend (Email)"
        value={friend}
        onChange={(e) => setFriend(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddFriend} sx={{ mt: 2 }}>
        Add Friend
      </Button>
      <List>
        {tripData.friends.map((f, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFriend(f)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={f} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PeopleStep;
