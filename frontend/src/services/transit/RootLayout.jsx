import { Box, Grid, Item } from '@mui/material'
import MapComponent from './MapComponent'
import Sidebar from './SideBar';

const RootLayout = () => {

    return(
        <Box>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <Sidebar/>
                </Grid>
                <Grid item xs={6}>
                <MapComponent />
                </Grid>
            </Grid>
        </Box>
    )

}

export default RootLayout;