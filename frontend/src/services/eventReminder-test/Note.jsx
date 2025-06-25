import React, { useState } from "react";
import { Card, CardContent, CardActions, TextField, Typography, Button, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({
    title: props.title || "",
    content: props.content || "",
    date: props.date || "",
    time: props.time || "",
    venue: props.venue || "",
    image: props.image || ""
  });

  const handleClickDelete = () => {
    props.onDelete(props.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleImageUpdate = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUpdatedNote(prevNote => ({
        ...prevNote,
        image: imageURL
      }));
    }
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    props.onUpdate(props.id, updatedNote);
    setIsEditing(false);
  };

  const handleBack = () => {
    setIsEditing(false);
    setUpdatedNote({
      title: props.title,
      content: props.content,
      date: props.date,
      time: props.time,
      venue: props.venue,
      image: props.image
    });
  };

  return (
    <Card sx={{ marginBottom: 2, padding: 2, boxShadow: 3 }}>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              name="title"
              label="Event Title"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleUpdateChange}
              value={updatedNote.title}
              required
            />
            <TextField
              name="content"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              onChange={handleUpdateChange}
              value={updatedNote.content}
              required
            />
            <TextField
              name="date"
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleUpdateChange}
              value={updatedNote.date}
              required
            />
            <TextField
              name="time"
              label="Time"
              type="time"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleUpdateChange}
              value={updatedNote.time}
              required
            />
            <TextField
              name="venue"
              label="Venue"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleUpdateChange}
              value={updatedNote.venue}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpdate}
              style={{ marginTop: '10px', marginBottom: '10px' }}
            />
            {updatedNote.image && (
              <Box mt={1} mb={2}>
                <img
                  src={updatedNote.image}
                  alt="event"
                  style={{ width: "100px", height: "100px", borderRadius: '5px' }}
                />
              </Box>
            )}
            <CardActions>
              <Button type="submit" variant="contained" color="primary" startIcon={<SaveAltIcon />}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" startIcon={<ArrowBackIcon />} onClick={handleBack}>
                Cancel
              </Button>
            </CardActions>
          </form>
        ) : (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              {props.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {props.content}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Date: {props.date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Time: {props.time}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Venue: {props.venue}
            </Typography>
            {props.image && (
              <Box mt={2}>
                <img
                  src={props.image}
                  alt="event"
                  style={{ width: "100px", height: "100px", borderRadius: '5px' }}
                />
              </Box>
            )}
            <CardActions>
              <IconButton onClick={handleEditClick} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleClickDelete} color="error">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Note;
