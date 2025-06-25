import * as React from 'react';
import { Grid } from '@mui/material';

//Layout

//Pages
import EventPage from '../pages/EventPage';
import MapPage from '../pages/MapPage';
import SettingsPage from '../pages/SettingsPage';

const EventReminderLayout = () => {

    return(
        <Grid container spacing={0} xs={12} sx={{ margin: 0 }}>
            <Grid item xs={6} sx={{  margin: 0, padding: 0, height: '100vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                <EventPage />
            </Grid>
            <Grid item xs={6} sx={{ backgroundColor: 'red' ,  margin: 0, padding: 0 , height: '100vh', overflowY: 'hidden' }}>
                <MapPage />
            </Grid>
        </Grid>
    )
}

export default EventReminderLayout;