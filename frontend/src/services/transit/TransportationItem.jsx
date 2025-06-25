import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Button, Avatar } from "@mui/material";
import PropTypes from 'prop-types';
import TransportationDetails from './TransportationDetails';

const transportationData = [
    {
        id: 1,
        title: "Bus Route A",
        description: "Route A - Matara to Colombo",
        busNumber: "12A",
        route: {
            matara: { lon: "80.5834", lat: "5.9551" },
            galle: { lon: "80.2167", lat: "6.0436" }
        },
        time: { start: "06:00 AM", end: "08:00 PM" },
        type: "bus",
        hotline: "123-456-7890",
        avatar: "./images/bus.png",
        name: "Ali Connors",
    },
    {
        id: 2,
        title: "Bus Route B",
        description: "Route B - Suburbs to Downtown",
        busNumber: "45B",
        route: {
            suburbs: { lon: "80.2200", lat: "6.9250" },
            downtown: { lon: "80.2480", lat: "6.9340" }
        },
        time: { start: "05:00 AM", end: "11:00 PM" },
        type: "bus",
        hotline: "234-567-8901",
        avatar: "./images/bus.png",
        name: "Travis Howard",
    },
    {
        id: 3,
        title: "Bus Route C",
        description: "Route C - Uptown to Suburbs",
        busNumber: "78C",
        route: {
            uptown: { lon: "80.2700", lat: "6.9150" },
            suburbs: { lon: "80.2200", lat: "6.9250" }
        },
        time: { start: "06:30 AM", end: "09:30 PM" },
        type: "bus",
        hotline: "345-678-9012",
        avatar: "./images/bus.png",
        name: "Sandra Adams",
    },
];

const TransportationItem = (props) => {
    const { window } = props;
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleViewClick = (item) => () => {
        setSelectedItem(item);
        setOpen(true);
    };

    return (
        <Container>
            <Box sx={{ width: '100%', maxWidth: '90vw', bgcolor: 'background.paper' }}>
                {transportationData.map((item) => (
                    <Grid container spacing={2} sx={{ outline: 'none', marginTop: '1.5em' }} key={item.id}>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                padding: 2.5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                                backgroundColor: '#13005A',
                                borderRadius: '20px 0 0 20px',
                                outline: 'none'
                            }}
                        >
                            <Avatar alt={item.name} src={item.avatar} sx={{ width: 56, height: 56 }} />
                        </Grid>

                        <Grid
                            item
                            xs={8}
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '0 20px 20px 0',
                                padding: 2,
                            }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography component="span" variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
                                        {item.description}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6} sx={{ textAlign: 'left' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Time: {item.time.start} - {item.time.end}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <Typography
                                        sx={{
                                            backgroundColor: 'white',
                                            borderColor: '03C988',
                                            borderRadius: '10px',
                                            padding: '0.2em 1em',
                                            color: 'black',
                                            textAlign: 'center'
                                        }} variant="contained"
                                    >
                                        SEMI
                                    </Typography>
                                </Grid>

                                <Grid item xs={6} sx={{ textAlign: 'left' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Name: {item.name}
                                    </Typography>
                                </Grid>

                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    <Button variant="contained" color="primary" sx={{ borderRadius: '10px' }} onClick={handleViewClick(item)}>
                                        View
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Box>
            {selectedItem && (
                <TransportationDetails
                    window={window}
                    toggleDrawer={toggleDrawer(false)}
                    open={open}
                    selectedItem={selectedItem}
                />
            )}
        </Container>
    );
}

TransportationItem.propTypes = {
    window: PropTypes.func,
};

export default TransportationItem;
