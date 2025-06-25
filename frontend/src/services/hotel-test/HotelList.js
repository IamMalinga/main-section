// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
// import { Link } from 'react-router-dom';

// const HotelList = () => {
//     const [hotels, setHotels] = useState([]);
//     const [searchCity, setSearchCity] = useState(''); // State to hold the search input

//     // Fetch hotels based on the city, or fetch all if no city is provided
//     const fetchHotels = (city = '') => {
//         axios.get('/api/hotels/search', {
//             params: { city }
//         })
//         .then(res => {
//             setHotels(res.data);
//         })
//         .catch(err => console.error('Error fetching hotels:', err));
//     };

//     // Fetch all hotels initially
//     useEffect(() => {
//         fetchHotels(); // Fetch all hotels on initial load
//     }, []);

//     // Handle the search button click
//     const handleSearch = () => {
//         fetchHotels(searchCity);
//     };

//     return (
//         <div>
//             {/* Search Bar */}
//             <TextField
//                 label="Search by City"
//                 variant="outlined"
//                 value={searchCity}
//                 onChange={(e) => setSearchCity(e.target.value)}
//                 style={{ marginBottom: '20px' }}
//             />
//             <Button variant="contained" onClick={handleSearch}>
//                 Search
//             </Button>

//             {/* Hotel List */}
//             <Grid container spacing={3}>
//                 {hotels.length > 0 ? (
//                     hotels.map((hotel) => (
//                         <Grid item key={hotel._id} xs={12} sm={6} md={4}>
//                             <Card>
//                                 <CardContent>
//                                     <Typography variant="h6">{hotel.name}</Typography>
//                                     <Typography variant="body2">{hotel.city}</Typography>
//                                     <Typography variant="body2">{hotel.address}</Typography>
//                                     <Link to={`/hotels/${hotel._id}`}>View Details</Link>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     ))
//                 ) : (
//                     <Typography variant="body2">No hotels found.</Typography>
//                 )}
//             </Grid>
//         </div>
//     );
// };

// export default HotelList;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Grid, Typography, TextField, Button } from '@mui/material';
// import HotelCard from '../../components/hotels/HotelCard'; // Update the import path as needed

// const HotelList = () => {
//     const [hotels, setHotels] = useState([]);
//     const [searchCity, setSearchCity] = useState(''); // State to hold the search input

//     // Fetch hotels based on the city, or fetch all if no city is provided
//     const fetchHotels = (city = '') => {
//         axios.get('/api/hotels/search', {
//             params: { city }
//         })
//         .then(res => {
//             setHotels(res.data);
//         })
//         .catch(err => console.error('Error fetching hotels:', err));
//     };

//     // Fetch all hotels initially
//     useEffect(() => {
//         fetchHotels(); // Fetch all hotels on initial load
//     }, []);

//     // Handle the search button click
//     const handleSearch = () => {
//         fetchHotels(searchCity);
//     };

//     return (
//         <div>
//             {/* Search Bar */}
//             <TextField
//                 label="Search by City"
//                 variant="outlined"
//                 value={searchCity}
//                 onChange={(e) => setSearchCity(e.target.value)}
//                 style={{ marginBottom: '20px' }}
//             />
//             <Button variant="contained" onClick={handleSearch}>
//                 Search
//             </Button>

//             {/* Hotel List */}
//             <Grid container spacing={3}>
//                 {hotels.length > 0 ? (
//                     hotels.map((hotel) => (
//                         <Grid item key={hotel._id} xs={12} sm={6} md={4}>
//                             <HotelCard hotel={hotel} />
//                         </Grid>
//                     ))
//                 ) : (
//                     <Typography variant="body2">No hotels found.</Typography>
//                 )}
//             </Grid>
//         </div>
//     );
// };

// export default HotelList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Typography, TextField, Button } from '@mui/material';
import HotelCard from './HotelCard'; // Ensure this path is correct

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [searchCity, setSearchCity] = useState('');

    // Fetch hotels based on the city, or fetch all if no city is provided
    const fetchHotels = (city = '') => {
        axios.get('/api/hotels/search', { params: { city } })
            .then(res => setHotels(res.data))
            .catch(err => console.error('Error fetching hotels:', err));
    };

    // Fetch all hotels initially
    useEffect(() => {
        fetchHotels(); // Fetch all hotels on initial load
    }, []);

    // Handle the search button click
    const handleSearch = () => {
        fetchHotels(searchCity);
    };

    return (
        <div>
            {/* Search Bar */}
            <TextField
                label="Search by City"
                variant="outlined"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" onClick={handleSearch}>
                Search
            </Button>

            {/* Hotel List */}
            <Grid container spacing={3}>
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <Grid item key={hotel._id} xs={12} sm={6} md={4}>
                            <HotelCard hotel={hotel} />  {/* Pass the hotel data to the HotelCard component */}
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2">No hotels found.</Typography>
                )}
            </Grid>
        </div>
    );
};

export default HotelList;
