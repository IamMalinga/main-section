import React, { useState } from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Button, Typography,
  Box, Grid, CardHeader, Select, MenuItem, Pagination, Stack
} from '@mui/material';
import MapComponent from './MapComponent'; // Import the MapComponent

const data = [{
  title: 'Iphone 15 lost',
  category: 'mobile',
  img: '../assets/accommodation1.jpg',
  date: '2024/08/25',
  place: 'Polonnaruwa'
}, {
  title: 'Iphone 15 lost',
  category: 'mobile',
  img: '../assets/accommodation1.jpg',
  date: '2024/08/25',
  place: 'Polonnaruwa'
}, {
  title: 'Iphone 15 lost',
  category: 'mobile',
  img: '../assets/accommodation1.jpg',
  date: '2024/08/25',
  place: 'Colombo'
}, {
  title: 'Iphone 15 lost',
  category: 'mobile',
  img: '../assets/accommodation1.jpg',
  date: '2024/08/25',
  place: 'Polonnaruwa'
}, {
  title: 'Iphone 15 lost',
  category: 'mobile',
  img: '../assets/accommodation1.jpg',
  date: '2024/08/25',
  place: 'Polonnaruwa'
}, {
  title: 'Iphone 15 lost',
  category: 'mobile',
  img: '../assets/accommodation1.jpg',
  date: '2024/08/25',
  place: 'Polonnaruwa'
}];

const ActionCard = ({ title, img, date, place }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component="img" sx={{ width: 250 }} image={img} alt={title} />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 0 auto' }}>
        <CardHeader title={title} subheader={date} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {place}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" color="primary">
            Action 1
          </Button>
          <Button size="small" color="primary">
            Action 2
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

const LostItemsLayout = () => {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [page, setPage] = useState(1);

  const itemsPerPage = 5;
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredData = data.filter(item => {
    return (
      (category === '' || item.category === category) &&
      (date === '' || item.date === date) &&
      (place === '' || item.place === place)
    );
  });

  const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Extract unique places with counts for the map
  const locationCounts = data.reduce((acc, item) => {
    if (acc[item.place]) {
      acc[item.place].count += 1;
    } else {
      acc[item.place] = { place: item.place, coordinates: [7.8731, 80.7718], count: 1 }; // Add coordinates as needed
    }
    return acc;
  }, {});

  const locations = Object.values(locationCounts);

  return (
    <Box sx={{ marginTop: 15, margin: 5 }}>
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        sx={{ marginTop: 5, width: 250, height: 50, marginLeft: 2 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="mobile">Mobile</MenuItem>
        {/* Add more categories as needed */}
      </Select>

      <Select
        value={date}
        onChange={(e) => setDate(e.target.value)}
        displayEmpty
        sx={{ marginTop: 5, width: 250, height: 50, marginLeft: 2 }}
      >
        <MenuItem value="">All Dates</MenuItem>
        {/* Dynamically create date options based on available data */}
        {Array.from(new Set(data.map(item => item.date))).map(date => (
          <MenuItem key={date} value={date}>{date}</MenuItem>
        ))}
      </Select>

      <Select
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        displayEmpty
        sx={{ marginTop: 5, width: 250, height: 50, marginLeft: 2 }}
      >
        <MenuItem value="">All Places</MenuItem>
        {/* Dynamically create place options based on available data */}
        {Array.from(new Set(data.map(item => item.place))).map(place => (
          <MenuItem key={place} value={place}>{place}</MenuItem>
        ))}
      </Select>

      <Box sx={{ display:'flex', flexDirection:'row'}}>
        <Grid container spacing={3} sx={{ padding: 2}}>
          {paginatedData.map((item, index) => (
            <Grid item key={index} sx={{ width: '100%' }}>
              <ActionCard {...item} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '50%' ,marginTop: 2}}>
        <MapComponent locations={locations} />
        </Box>
      </Box>

      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          color="primary"
        />
      </Stack>


    </Box>
  );
};

export default LostItemsLayout;
