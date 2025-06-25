import * as React from "react";
import { Grid, Box, Typography } from "@mui/material";

import MapPage from "../pages/MapPage";
import SettingsPage from "../pages/SettingsPage";
import PostList from "../components/PostList";
import Shorts from "../components/Shorts";
import { useState } from "react";

const OpenChatLayout = () => {
  const [scrollToPostId, setScrollToPostId] = useState(null);

  const handlePostClick = (postId) => {
    setScrollToPostId(postId); // Set the ID of the post to scroll to
  };

  return (
    <Grid container sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Chat Section */}
      <Grid
        item
        xs={6}
        sx={{
          height: "100vh",
          overflowY: "auto",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", // Gradient with depth
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px 20px",
        }}
      >
        <Shorts
          sx={{
            width: "100%",
            maxWidth: "800px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            borderRadius: "15px",
            background: "#1a2a38",
            padding: "20px",
            marginBottom: "20px",
          }}
        />
        <PostList
          scrollToPostId={scrollToPostId}
          sx={{
            width: "100%",
            maxWidth: "800px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            borderRadius: "15px",
            background: "#1a2a38",
            padding: "20px",
          }}
        />
      </Grid>

      {/* Settings Section */}
      <Grid
        item
        xs={1}
        sx={{
          height: "100vh",
          background: "#1e293b",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          padding: "10px",
          borderRight: "1px solid #2e3a47",
        }}
      >
        <SettingsPage />
      </Grid>

      {/* Map Section */}
      <Grid
        item
        xs={5}
        sx={{
          height: "100vh",
          background: "linear-gradient(to bottom, #e63946, #f06543)", // Vibrant gradient
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 10,
            background: "#ffffff",
            borderRadius: "10px",
            padding: "10px 20px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', Arial, sans-serif",
              fontWeight: 600,
              color: "#1a202c",
            }}
          >
            Interactive Map
          </Typography>
        </Box>
        <MapPage onPostClick={handlePostClick} />
      </Grid>
    </Grid>
  );
};

export default OpenChatLayout;
