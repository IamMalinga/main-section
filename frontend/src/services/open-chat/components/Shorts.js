import { useEffect, useRef, useState } from 'react';
import { Box, List, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MyShort from './MyShort';
import AddShortModel from './AddShortModel';
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";

const Shorts = () => {
    const listRef = useRef(null);
    const { user } = useAuthContext(); 
    const [shorts, setShorts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchShorts = async () => {
            try {
                const response = await fetch('/api/services/open-chat/shorts', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();
                setShorts(data);
            } catch (error) {
                console.error("Failed to fetch shorts:", error);
            }
        };

        fetchShorts();
    }, [user]);

    const scrollLeft = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (listRef.current) {
            listRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    const handleAddShort = (short) => {
        setShorts([...shorts, short]);
        setModalOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
            <IconButton onClick={scrollLeft} sx={{ position: 'absolute', left: 0, zIndex: 1 }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box sx={{ overflowX: 'hidden', width: '100%', display: 'flex', alignItems: 'center' }}>
                <List ref={listRef} sx={{ display: 'flex', flexDirection: 'row', padding: 0, margin: 0, whiteSpace: 'nowrap', scrollBehavior: 'smooth' }}>
                    {shorts.map((short, index) => (
                        <MyShort key={index} content={short.content} image={short.image} />
                    ))}
                </List>
            </Box>
            <IconButton onClick={scrollRight} sx={{ position: 'absolute', right: 0, zIndex: 1 }}>
                <ArrowForwardIosIcon />
            </IconButton>
            <AddShortModel open={modalOpen} handleClose={() => setModalOpen(false)} addShort={handleAddShort} />
        </Box>
    );
};

export default Shorts;
