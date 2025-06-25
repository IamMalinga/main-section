import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Paper, Box, Typography, CircularProgress, Alert } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Search from "./Search";

function EventReminder() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [notification, setNotification] = useState(""); 
  const [mapLocation, setMapLocation] = useState(null); 

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then((response) => {
        setNotes(response.data);
        setFilteredNotes(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  function loadGoogleMap(location) {
    const mapScript = document.createElement('script');
    mapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqzGYxZDTRhnYtjZBxRJpFAWHIGh9xcY4&callback=initMap`; 
    window.initMap = function () {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ 'address': location }, function (results, status) {
        if (status === 'OK') {
          const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: results[0].geometry.location
          });
          new window.google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
        }
      });
    };
    document.head.appendChild(mapScript);
  }

  const addNote = (newNote) => {
    axios.post("http://localhost:5000/api/events", newNote)
      .then((response) => {
        setNotes((prevNotes) => [...prevNotes, response.data]);
        setFilteredNotes((prevNotes) => [...prevNotes, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const deleteNote = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter(noteItem => noteItem._id !== id));
        setFilteredNotes((prevNotes) => prevNotes.filter(noteItem => noteItem._id !== id));
      })
      .catch((error) => console.error(error));
  };

  const updateNote = (id, updatedNote) => {
    axios.put(`http://localhost:5000/api/events/${id}`, updatedNote)
      .then((response) => {
        setNotes((prevNotes) => prevNotes.map(noteItem => noteItem._id === id ? response.data : noteItem));
        setFilteredNotes((prevNotes) => prevNotes.map(noteItem => noteItem._id === id ? response.data : noteItem));
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = (searchTerm) => {
    setNotification("");
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.date.includes(searchTerm)
    );
    setFilteredNotes(filtered);
    if (filtered.length > 0) {
      const location = filtered[0].venue;
      setMapLocation(location);
      loadGoogleMap(location);
      setNotification(`Showing results for "${searchTerm}"`);
    } else {
      setNotification(`No results found for "${searchTerm}"`);
    }
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Header />
      {notification && <Alert severity="info" sx={{ mt: 2 }}>{notification}</Alert>}
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Event Form and Search Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Search onSearch={handleSearch} />
            <CreateArea onAdd={addNote} />
            {filteredNotes.length > 0 ? (
              filteredNotes.map((noteItem) => (
                <Note
                  key={noteItem._id}
                  id={noteItem._id}
                  title={noteItem.title}
                  content={noteItem.content}
                  date={noteItem.date}
                  time={noteItem.time}
                  venue={noteItem.venue}
                  image={noteItem.image}
                  onDelete={deleteNote}
                  onUpdate={updateNote}
                />
              ))
            ) : (
              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                No events found
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Map Location Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" align="center">Venue Location</Typography>
            {mapLocation ? (
              <Box id="map" sx={{ width: '100%', height: 400, mt: 2 }} />
            ) : (
              <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                No location selected
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

export default EventReminder;
