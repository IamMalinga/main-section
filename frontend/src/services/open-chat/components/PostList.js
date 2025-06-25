import React, { useEffect, useState, useRef } from "react";
import Post from "./Post";
import { fetchPostsByLocation, editPost, deletePost } from "../api";
import { useTripContext } from "../../../hooks/useTripContext";
import ChatModel from "./ChatModel";
import { useAuthContext } from "../../../authentication/hooks/useAuthContext";
import { CircularProgress, Box, Snackbar, Alert, Typography } from "@mui/material";

const PostList = ({ scrollToPostId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const postRefs = useRef({});
  const { tripData } = useTripContext();
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuthContext();

  const handleCommentClick = (user) => {
    setSelectedUser(user);
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
    setSelectedUser(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      setLoading(true);
      await deletePost(postId, user.token);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      setDeleteSuccess(true);
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeleteError("Failed to delete the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!tripData || !tripData.destinations || tripData.destinations.length === 0) {
      console.log("Trip data is not yet available");
      return;
    }

    const currentDestination = tripData.destinations[0];
    const { lat, lng } = currentDestination.position;

    setLoading(true);
    fetchPostsByLocation(lat, lng)
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tripData]);

  useEffect(() => {
    if (scrollToPostId && postRefs.current[scrollToPostId]) {
      postRefs.current[scrollToPostId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [scrollToPostId]);

  const handleCloseSnackbar = () => {
    setDeleteSuccess(false);
    setDeleteError(null);
  };

  return (
    <Box>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            ref={(el) => (postRefs.current[post._id] = el)}
          >
            <Post
              post={post}
              onCommentClick={() => handleCommentClick(post.userId)}
              onDelete={() => handleDeletePost(post._id)}
            />
          </div>
        ))
      ) : (
        !loading && <Typography>No posts available for this location.</Typography>
      )}

      {selectedUser && (
        <ChatModel
          open={chatOpen}
          handleClose={handleCloseChat}
          initialUser={selectedUser}
        />
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Post deleted successfully.
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(deleteError)}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {deleteError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostList;
