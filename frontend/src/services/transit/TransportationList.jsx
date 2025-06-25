import { Box } from "@mui/material";
import TransportationItem from "./TransportationItem";

  
const TransportationList = () => {
    return(
        <Box sx={{ scrollbarWidth:'2em', msScrollLimitYMax: '20px',height:'50.5vh', textAlign:'center', overflowY: 'auto', alignItems:'center', padding:'20px', borderRadius:'20px 0px 0px 20px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'}}>
            <TransportationItem />
        </Box>
    )
}

export default TransportationList;