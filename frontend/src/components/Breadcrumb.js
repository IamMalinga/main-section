import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Do not render breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #E3F2FD, #FFFFFF)",
        padding: "16px 24px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        fontFamily: "Poppins, Arial, sans-serif",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Breadcrumbs
        separator={
          <NavigateNextIcon
            fontSize="small"
            sx={{ color: "#B0BEC5", verticalAlign: "middle" }}
          />
        }
        aria-label="breadcrumb"
        sx={{
          "& a": {
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: 600,
            fontFamily: "Poppins, Arial, sans-serif",
            color: "#0288D1",
            textDecoration: "none",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#01579B",
              textDecoration: "underline",
            },
            "&:focus": {
              outline: "2px solid #4FC3F7",
              borderRadius: "4px",
            },
          },
          "& .MuiTypography-root": {
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "Poppins, Arial, sans-serif",
            color: "#455A64",
          },
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "#0288D1" }}>
          <HomeIcon sx={{ mr: 0.5, fontSize: "18px", verticalAlign: "middle" }} />
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography
              key={to}
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "16px",
                fontFamily: "Poppins, Arial, sans-serif",
                color: "#37474F",
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: "none",
                color: "#0288D1",
                display: "flex",
                alignItems: "center",
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
