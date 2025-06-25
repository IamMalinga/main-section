import React from "react";
import {
    Box,
    Grid,
    Typography,
    Avatar,
    Button,
    Paper,
    Divider,
    Container,
    useTheme,
    Stack,
    Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HubIcon from '@mui/icons-material/Hub';

const teamMembers = [
    {
        name: "M. Samarakoon",
        role: "Lead Developer",
        image: "/assets/udara.jpg",
        description: "Expert in Distance Calculation, Traffic Analysis, and Review System Development.",
        skills: ["JavaScript", "Node.js", "MongoDB"],
    },
    {
        name: "Piyumi Bhagya",
        role: "Frontend Developer",
        image: "/assets/piyumi.jpg",
        description: "Specializes in Weather API Integration, Travel Recommendations, and UI Design.",
        skills: ["React.js", "Material-UI", "GraphQL"],
    },
    {
        name: "Udara Pieris",
        role: "Backend Developer",
        image: "/assets/samarakoon.jpg",
        description: "Focuses on Backend Infrastructure, Chat Systems, and Scheduling Algorithms.",
        skills: ["Express.js", "Socket.io", "PostgreSQL"],
    },
    {
        name: "Steve Thomas",
        role: "Full Stack Developer",
        image: "/assets/steve.jpg",
        description: "Handles Vehicle Rental Services, Public Transportation Integration, and Service Centers.",
        skills: ["Next.js", "Redux", "Firebase"],
    },
];

const AboutPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Container sx={{ mt: 8, mb: 8 }}>
            <Paper
                elevation={4}
                sx={{
                    p: { xs: 5, md: 8 },
                    boxShadow: 0,
                    borderRadius: '32px',
                    backgroundColor: theme.palette.background.paper,
                    background: `linear-gradient(135deg, ${theme.palette.background.default} 30%, ${theme.palette.background.paper} 100%)`,
                }}
            >
                <Box textAlign="center">
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 'bold',
                            color: theme.palette.text.primary,
                            textTransform: 'uppercase',
                            letterSpacing: 2,
                        }}
                    >
                        Discover Our Vision
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
                        Bridging technology and travel for seamless experiences.
                    </Typography>
                </Box>

                <Divider sx={{ my: 6, backgroundColor: theme.palette.divider }} />

                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: theme.palette.primary.main }}>
                            Revolutionizing Travel Planning
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, lineHeight: 1.7 }}>
                            We are redefining how travelers explore Sri Lanka by providing a platform that integrates
                            personalized recommendations, real-time updates, and seamless trip management. Our solution
                            is designed to eliminate the stress of planning, ensuring every traveler enjoys a smooth and
                            memorable experience.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: '100%',
                                height: 0,
                                paddingBottom: '75%',
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 4,
                                boxShadow: theme.shadows[4],
                                '&:hover img': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            <img
                                src="/assets/travel-srilanka.jpg"
                                alt="Modern Travel"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease-in-out',
                                }}
                                className="hover-zoom"
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 6, backgroundColor: theme.palette.divider }} />

                <Grid container spacing={6}>
                    <Grid item xs={12} md={4}>
                        <Stack alignItems="center" spacing={2}>
                            <FlightTakeoffIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                Intuitive Design
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                                Our platform is designed with simplicity and ease-of-use in mind, ensuring every feature is just a click away.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack alignItems="center" spacing={2}>
                            <EmojiPeopleIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                Personalized Experience
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                                Tailored recommendations based on user preferences and real-time data for a unique travel experience.
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack alignItems="center" spacing={2}>
                            <HubIcon sx={{ fontSize: 100, color: theme.palette.primary.main }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                Advanced Technology
                            </Typography>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                                Leveraging the latest technologies for a seamless and integrated travel solution.
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 6, backgroundColor: theme.palette.divider }} />

                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: theme.palette.text.primary, mb: 6 }}>
                    Meet the Visionaries
                </Typography>

                <Grid container spacing={6}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <Paper
                                elevation={6}
                                sx={{
                                    p: 4,
                                    borderRadius: 6,
                                    textAlign: 'center',
                                    backgroundColor: theme.palette.background.default,
                                    transition: 'transform 0.3s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                    },
                                }}
                            >
                                <Avatar
                                    src={member.image}
                                    alt={member.name}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mx: 'auto',
                                        mb: 2,
                                        boxShadow: theme.shadows[3],
                                        border: `4px solid ${theme.palette.primary.main}`,
                                    }}
                                />
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                                    {member.name}
                                </Typography>
                                <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary }}>
                                    {member.role}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
                                    {member.description}
                                </Typography>
                                <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
                                    {member.skills.map((skill, i) => (
                                        <Chip key={i} label={skill} variant="outlined" size="small" sx={{ color: theme.palette.text.secondary }} />
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 6, backgroundColor: theme.palette.divider }} />

                <Box sx={{ textAlign: 'center', mt: 8 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{
                            px: 6,
                            py: 2,
                            borderRadius: '50px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            boxShadow: theme.shadows[3],
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                        onClick={() => navigate('/features')}
                    >
                        Discover Features
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AboutPage;
