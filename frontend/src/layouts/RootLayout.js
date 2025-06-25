import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import {Box} from "@mui/material";
import Breadcrumb from '../components/Breadcrumb';



const RootLayout = () => {
    return(
    <Box>
        <Box>
            <Header />
        </Box>
        <Box >
        <Breadcrumb />
            <Outlet />
        </Box>
        <Box>
            <Footer />
        </Box>
    </Box>
    )
};

export default RootLayout;
