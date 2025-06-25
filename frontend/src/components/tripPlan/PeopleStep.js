import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuthContext } from "../../authentication/hooks/useAuthContext";

const PeopleStep = ({ tripData = {}, updateTripData }) => {
  const [friend, setFriend] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuthContext();

  // Ensure `tripData.friends` is always an array
  const friends = tripData.friends || [];

  const handleAddFriend = async () => {
    if (friend.trim() === '') {
      setError('Friend email cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/friends/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email: friend }),
      });

      const data = await response.json();

      if (data.exists) {
        if (friends.includes(friend)) {
          setError('Friend is already added');
        } else {
          const newFriends = [...friends, friend];
          updateTripData({ friends: newFriends });
          setFriend('');
          setError('');
        }
      } else {
        await sendInvite(friend);
      }
    } catch (error) {
      console.error('Error checking or inviting friend:', error);
      setError('There was an error processing your request.');
    }
  };

  const sendInvite = async (friendEmail) => {
    try {
      await fetch('/api/friends/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ email: friendEmail }),
      });
      alert('Friend is not registered. An invite has been sent.');
      setFriend('');
      setError('');
    } catch (error) {
      console.error('Error sending invite:', error);
      setError('Failed to send an invite.');
    }
  };

  const handleRemoveFriend = (friendToRemove) => {
    const newFriends = friends.filter((f) => f !== friendToRemove);
    updateTripData({ friends: newFriends });
  };

  const handlePeopleChange = (e) => {
    const numberOfPeople = e.target.value;
    updateTripData({ people: numberOfPeople });
  };

  const travelOptions = [
    { label: 'Just Me', description: 'A sole traveler in exploration', value: 'just_me', icon: '✈️' },
    { label: 'A Couple', description: 'Two travelers in tandem', value: 'couple', icon: '🥂' },
    { label: 'Family', description: 'A group of fun-loving adventurers', value: 'family', icon: '🏡' },
    { label: 'Friends', description: 'A bunch of thrill-seekers', value: 'friends', icon: '⛵' },
  ];

  return (
    <Box p={3}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Who do you plan on traveling with on your next adventure?
          </Typography>
          <Grid container spacing={3}>
            {travelOptions.map((option) => (
              <Grid item xs={12} key={option.value}>
                <Card
                  variant="outlined"
                  onClick={() => updateTripData({ travelWith: option.value })}
                  sx={{
                    backgroundColor: tripData.travelWith === option.value ? '#e3f2fd' : '#fff',
                    borderColor: tripData.travelWith === option.value ? 'primary.main' : 'grey.300',
                    boxShadow: tripData.travelWith === option.value ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent>
                      <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
                        {option.icon} <Box component="span" sx={{ ml: 1 }}>{option.label}</Box>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <TextField
            label="Invite Friend (Email)"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
            margin="normal"
            sx={{ mt: 4, backgroundColor: '#fff', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFriend}
            sx={{
              mt: 2,
              py: 1.5,
              px: 3,
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                backgroundColor: '#1976D2',
              },
            }}
          >
            Add Friend
          </Button>

          <List sx={{ mt: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            {friends.map((f, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFriend(f)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{
                  backgroundColor: '#fff',
                  mb: 1,
                  borderRadius: 2,
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}
              >
                <ListItemText primary={f} />
              </ListItem>
            ))}
          </List>

          <TextField
            label="Number of People"
            type="number"
            value={tripData.people || ''}
            onChange={handlePeopleChange}
            fullWidth
            margin="normal"
            sx={{ mt: 4, backgroundColor: '#fff', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            image="/assets/people.jpg"
            alt="People"
            sx={{
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              height: { xs: '300px', md: '100%' },
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PeopleStep;
