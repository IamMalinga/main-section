import React from "react";
import { Card, CardMedia, Avatar, Typography, Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProfileHeader = ({ profile, onEditBanner, onEditProfilePic, onEditBio }) => {
  return (
    <Card
      sx={{
        width: "100%",
        marginBottom: "20px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "16px",
        overflow: "hidden",
        background: "linear-gradient(145deg, #f5f5f5, #e0e0e0)",
      }}
    >
      {/* Banner Section */}
      <Box sx={{ position: "relative" }}>
        {profile.banner ? (
          <CardMedia
            component="img"
            height="250"
            image={profile.banner}
            alt="Cover photo"
            sx={{
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            height="250px"
            sx={{
              background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
            }}
          />
        )}
        <Tooltip title="Edit Banner" placement="top">
          <IconButton
            onClick={onEditBanner}
            sx={{
              position: "absolute",
              top: "16px",
              right: "16px",
              color: "white",
              background: "rgba(0, 0, 0, 0.5)",
              "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Profile Picture and Details Section */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          padding: "24px",
          background: "white",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        {/* Profile Picture */}
        <Box sx={{ position: "relative", display: "inline-block", marginTop: "-60px" }}>
          <Avatar
            src={profile.profilePic || "./default-profile.jpg"}
            alt={`${profile.firstName} ${profile.lastName}`}
            sx={{
              width: 120,
              height: 120,
              border: "4px solid white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Tooltip title="Edit Profile Picture" placement="top">
            <IconButton
              onClick={onEditProfilePic}
              sx={{
                position: "absolute",
                bottom: 0,
                right: -10,
                color: "white",
                background: "#007BFF",
                "&:hover": { background: "#0056b3" },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* User Name */}
        <Typography
          variant="h5"
          sx={{
            marginTop: "16px",
            fontWeight: "600",
            color: "#333",
          }}
        >
          {profile.firstName} {profile.lastName}
        </Typography>

        {/* User Bio */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "12px",
            color: "gray",
          }}
        >
          <Typography variant="body2" sx={{ maxWidth: "80%", textAlign: "center" }}>
            {profile.bio || "This user has not added a bio yet."}
          </Typography>
          <Tooltip title="Edit Bio" placement="top">
            <IconButton
              onClick={onEditBio}
              sx={{
                marginLeft: "8px",
                color: "gray",
                "&:hover": { color: "#000" },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Card>
  );
};

export default ProfileHeader;
