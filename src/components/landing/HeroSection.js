import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundVideo from '../../assets/videos/5356074-uhd_3840_2160_25fps.mp4';

const HeroSection = () => {
    return (
        <Box 
            sx={{ 
                position: 'relative', 
                overflow: 'hidden', 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                textAlign: 'center', 
                color: 'white',
                px: 2 
            }}
        >
            <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1
                }}
            >
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}
            />
            <Box sx={{ zIndex: 2 }}>
                <Typography 
                    variant="h3" 
                    gutterBottom 
                    sx={{ 
                        fontWeight: 'bold', 
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
                    }}
                >
                    Welcome to HealthHub
                </Typography>
                <Typography 
                    variant="h6" 
                    color="inherit" 
                    paragraph 
                    sx={{ 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' 
                    }}
                >
                    Streamline your medical processes with our cutting-edge software solutions.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/sign-up" 
                    sx={{ 
                        mt: 4, 
                        px: 4, 
                        py: 1.5, 
                        fontSize: '1.2rem', 
                        textTransform: 'none', 
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            transform: 'scale(1.05)',
                            transition: 'transform 0.3s ease-in-out',
                        }
                    }}
                >
                    Get Started
                </Button>
            </Box>
        </Box>
    );
};

export default HeroSection;
