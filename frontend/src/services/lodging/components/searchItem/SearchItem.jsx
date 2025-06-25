import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardMedia, CardContent, Typography, Rating } from "@mui/material";

const SearchItem = ({ item }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={item.photos[0]}
        alt={item.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        <CardContent>
          <Typography component="h2" variant="h5">
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {item.distance}m from center
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Free airport taxi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Studio Apartment with Air conditioning
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.desc}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Free cancellation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You can cancel later, so lock in this great price today!
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          {item.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Excellent
              </Typography>
              <Rating value={item.rating} readOnly precision={0.1} />
            </Box>
          )}
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6">
              ${item.cheapestPrice}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Includes taxes and fees
            </Typography>
            <Link to={`/services/lodging/${item._id}`} style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                See availability
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default SearchItem;
