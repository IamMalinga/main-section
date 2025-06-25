import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchItem from "../../components/searchItem/SearchItem";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import SearchIcon from '@mui/icons-material/Search';

const mockData = [
  {
    _id: "1",
    name: "Grand Hotel",
    type: "Hotel",
    city: "Krakow",
    address: "123 Main Street",
    distance: "500",
    photos: [
      "/assets/accommodation1.jpg",
      "/assets/accommodation1.jpg",
      "/assets/accommodation1.jpg",
    ],
    title: "Luxury Stay",
    desc: "A luxurious stay in the heart of the city.",
    rating: 4.5,
    rooms: ["Room1", "Room2", "Room3"],
    cheapestPrice: 150,
    featured: true,
  },
  {
    _id: "2",
    name: "Budget Inn",
    type: "Inn",
    city: "Warsaw",
    address: "456 Side Street",
    distance: "2000",
    photos: [
      "/assets/accommodation2.jpg",
      "/assets/accommodation2.jpg",
    ],
    title: "Affordable Comfort",
    desc: "Comfortable stay at an affordable price.",
    rating: 3.8,
    rooms: ["Room4", "Room5"],
    cheapestPrice: 80,
    featured: false,
  },
];

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState("Colombo");
  const [dates, setDates] = useState(location.state?.dates || [{ startDate: new Date(), endDate: new Date() }]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const { data, loading } = { data: mockData, loading: false };

  const handleClick = () => {
    // Fetch data logic
  };

  return (
    <Box sx={{ marginTop:'150px' }}>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box mb={2}>
              <Typography variant="h5">Search</Typography>
              <TextField
                fullWidth
                label="Destination"
                variant="outlined"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box mb={2}>
                <Typography variant="body1" gutterBottom>
                  Check-in Date
                </Typography>
                <Button variant="outlined" onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </Button>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                  />
                )}
              </Box>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Options
                </Typography>
                <TextField
                  fullWidth
                  label="Min price per night"
                  type="number"
                  variant="outlined"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Max price per night"
                  type="number"
                  variant="outlined"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Adult"
                  type="number"
                  variant="outlined"
                  value={options.adult}
                  onChange={(e) => setOptions({ ...options, adult: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Children"
                  type="number"
                  variant="outlined"
                  value={options.children}
                  onChange={(e) => setOptions({ ...options, children: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Room"
                  type="number"
                  variant="outlined"
                  value={options.room}
                  onChange={(e) => setOptions({ ...options, room: e.target.value })}
                  sx={{ mb: 2 }}
                />
              </Box>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Search
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {loading ? (
              <Typography variant="h6">Loading...</Typography>
            ) : (
              <Grid container spacing={2}>
                {data.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <SearchItem item={item} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default List;
