import { Box, Grid } from "@mui/material";
import ServiceDetails from "./ServiceDetails";
import CurrentDetails from "./CurrentDetails";
import SettingUp from "./SettingUp";
import TransportationList from "./TransportationList";

const Sidebar = () => {
    return(
        <Box sx={{ overflow:'auto', height:'100vh'}}>
        <Grid container spacing={2} sx={{ padding:'30px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
            <Grid item xs={5}>
                <ServiceDetails />
            </Grid>
            <Grid item xs={7}>
                <CurrentDetails />
            </Grid>
            <Grid item xs={12}>
                <SettingUp />
            </Grid>
            <Grid item xs={12}>
                <TransportationList />
            </Grid>
        </Grid>
        </Box>
    )

}

export default Sidebar;