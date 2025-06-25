import React, { useState, useRef } from "react";
import { Fab, Zoom, TextField, Button, Box, Typography, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const imageInputRef = useRef(null);
  const [isFormVisible, setFormVisible] = useState(true);
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    time: "",
    venue: "",
    image: ""
  });
  const [errors, setErrors] = useState({}); // State to hold error messages

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNote(prevNote => ({
        ...prevNote,
        image: imageURL
      }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!note.title) newErrors.title = "Event title is required.";
    if (!note.date) newErrors.date = "Date is required.";
    if (!note.time) newErrors.time = "Time is required.";
    if (!note.venue) newErrors.venue = "Venue is required.";
    return newErrors;
  };

  const submitNote = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await axios.post('http://localhost:5000/api/events', note);
      props.onAdd(response.data); // Add the note to the list after receiving the response
      setNote({
        title: "",
        content: "",
        date: "",
        time: "",
        venue: "",
        image: ""
      });
      setFormVisible(false); // Hide the form after submission
      if (imageInputRef.current) {
        imageInputRef.current.value = ""; // Reset the file input
      }
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  const expand = () => {
    setExpanded(true);
  };

  return (
    <Box display="flex" justifyContent="center" mb={3}>
      <Paper elevation={3} sx={{ padding: 2, width: '100%', maxWidth: '600px' }}>
        {isFormVisible ? (
          <form className="create-note" onSubmit={submitNote}> 
            {isExpanded && (
              <>
                <TextField
                  label="Event Title"
                  name="title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={note.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />

                <TextField
                  label="Date"
                  name="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={note.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  required
                />

                <TextField
                  label="Time"
                  name="time"
                  type="time"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={note.time}
                  onChange={handleChange}
                  error={!!errors.time}
                  helperText={errors.time}
                  required
                />

                <TextField
                  label="Venue"
                  name="venue"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={note.venue}
                  onChange={handleChange}
                  error={!!errors.venue}
                  helperText={errors.venue}
                  required
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={imageInputRef}
                  style={{ marginTop: '10px', marginBottom: '10px' }}
                />
                {note.image && (
                  <img
                    src={note.image}
                    alt="Preview"
                    style={{ width: "100px", height: "100px", marginTop: "10px", marginBottom: "10px" }}
                  />
                )}
              </>
            )}

            <TextField
              label={isExpanded ? "Description" : "Event"}
              name="content"
              variant="outlined"
              fullWidth
              multiline
              rows={isExpanded ? 3 : 1}
              margin="normal"
              value={note.content}
              onChange={handleChange}
              onClick={expand}
            />

            <Zoom in={isExpanded}>
              <Fab type="submit" color="primary" sx={{ mt: 2 }}>
                <AddIcon />
              </Fab>
            </Zoom>
          </form>
        ) : (
          <Box textAlign="center">
            <Button variant="outlined" color="primary" onClick={() => setFormVisible(true)}>
              Add another event
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CreateArea;
