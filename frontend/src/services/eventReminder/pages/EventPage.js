import { Box, Typography } from '@mui/material';

import PostList from '../components/PostList'
import Shorts from '../components/Shorts'

const ChatPage = () => {

    return(
    <Box sx={{ alignItems: 'center', justifyContent: 'center', justifyItems: 'center' , padding:'10px', }}>
        <Shorts />
        <PostList />
    </Box>
    )
}

export default ChatPage;