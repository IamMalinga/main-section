import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Badge,
  Grid,
  Menu,
  MenuItem,
  Snackbar,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { toggleLike, editPost, deletePost } from '../api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from '../../../authentication/hooks/useAuthContext';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#121212',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#bdbdbd',
    },
  },
});

const Post = ({ post, onCommentClick, onDelete }) => {
  const userName = `${post.userId?.firstName || ''} ${post.userId?.lastName || ''}`;
  const userProfilePic = post.userId?.profilePic;
  const userEmail = post.userId?.email;
  const { user } = useAuthContext();

  const [likes, setLikes] = useState(post.likes || []);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));

  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const isPostOwner = user._id === post.userId?._id;



  const handleLikeClick = async () => {
    try {
      const response = await toggleLike(post._id, user.token); // Call the toggle like API
      setLikes(response.likes);
      setIsLiked(response.isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/posts/${post._id}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      setSnackbarOpen(true);
      setAnchorEl(null);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleEditPost = async () => {
    try {
      await editPost(post._id, { content: editedContent }, user.token);
      setEditMode(false);
      post.content = editedContent; // Update content locally
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };




  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          width: '90%',
          maxWidth: 600,
          margin: '20px auto',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
          borderRadius: '15px',
          overflow: 'hidden', // Ensures the image aligns perfectly with the card
          background: 'linear-gradient(145deg, #1c1c1c, #2a2a2a)',
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={userProfilePic  }
              sx={{ bgcolor: red[500], width: 50, height: 50 }}
              aria-label="user"
            >
              {!userProfilePic && userName.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" sx={{ color: theme.palette.text.secondary }}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {userName}
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {new Date(post.createdAt).toLocaleString()}
            </Typography>
          }
        />
     {post.image && <CardMedia component="img" image={post.image} alt="Post Image" />}
      <CardContent>
        {editMode ? (
          <TextField
            fullWidth
            multiline
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        ) : (
          <Typography variant="body1">{post.content}</Typography>
        )}
        <Typography variant="body2">{userEmail}</Typography>
      </CardContent>
      <CardActions>
      <Grid container spacing={2} alignItems="center">
      <Grid item>
  
        <IconButton onClick={handleLikeClick} sx={{ color: isLiked ? '#f44336' : '#bdbdbd' }}>
          <Badge badgeContent={likes.length || 0} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        </Grid>

        <Grid item>
        <IconButton onClick={onCommentClick} aria-label="comment">
          <ChatBubbleOutlineIcon />
        </IconButton>
        </Grid>

        <Grid item>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} aria-label="share">
          <ShareIcon />
          <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 220,
          boxShadow: '0px 4px 20px rgba(0,0,0,0.2)',
          bgcolor: '#012233',
          padding: '10px 0',
        },
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 'bold',
          color: '#3ff',
          padding: '8px 16px',
        }}
      >
        Share Post
      </Typography>
      <Divider />
      <MenuItem onClick={handleCopyLink} sx={{ padding: '8px 16px' }}>
        <ListItemIcon>
          <FileCopyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Copy Link" />
      </MenuItem>
      <MenuItem
        component="a"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `${window.location.origin}/posts/${post._id}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ padding: '8px 16px' }}
      >
        <ListItemIcon>
          <FacebookIcon fontSize="small" sx={{ color: '#4267B2' }} />
        </ListItemIcon>
        <ListItemText primary="Share on Facebook" />
      </MenuItem>
      <MenuItem
        component="a"
        href={`https://twitter.com/share?url=${encodeURIComponent(
          `${window.location.origin}/posts/${post._id}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ padding: '8px 16px' }}
      >
        <ListItemIcon>
          <TwitterIcon fontSize="small" sx={{ color: '#1DA1F2' }} />
        </ListItemIcon>
        <ListItemText primary="Share on Twitter" />
      </MenuItem>
    </Menu>
        </IconButton>
        </Grid>
        {isPostOwner && (
          <>
          <Grid item>
            <IconButton onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
            </Grid>
          </>
        )}
        </Grid>
      </CardActions>
      {editMode && (
  <Dialog
    open={editMode}
    onClose={() => setEditMode(false)}
    sx={{
      '& .MuiDialog-paper': {
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #1e293b, #293548)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        color: '#ffffff',
      },
    }}
  >
    <DialogTitle
      sx={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        textAlign: 'center',
        color: '#e0e0e0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      Edit Post
    </DialogTitle>
    <DialogContent sx={{ padding: '24px', color: '#e0e0e0' }}>
      <TextField
        fullWidth
        multiline
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        variant="outlined"
        placeholder="Edit your post content here..."
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            background: '#1c2536',
            color: '#ffffff',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: '#64b5f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#42a5f5',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
        }}
      />
    </DialogContent>
    <DialogActions
      sx={{
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Button
        onClick={() => setEditMode(false)}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          color: '#f44336',
          fontWeight: 'bold',
          '&:hover': {
            background: 'rgba(244, 67, 54, 0.1)',
          },
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleEditPost}
        variant="contained"
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          background: 'linear-gradient(145deg, #64b5f6, #42a5f5)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(145deg, #42a5f5, #1e88e5)',
          },
        }}
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
)}

      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard!"
      />
    </ThemeProvider>
  );
};

export default Post;
