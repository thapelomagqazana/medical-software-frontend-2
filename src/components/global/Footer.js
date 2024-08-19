import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            sx={{ 
                backgroundColor: 'primary.dark', 
                color: 'white', 
                py: { xs: 2, sm: 4 },  // Adjust padding for different screen sizes
                mt: 4, 
                position: 'fixed', 
                bottom: 0, 
                width: '100%', 
                textAlign: 'center',
                height: { xs: 'auto', sm: '80px' }, // Make height auto for mobile, fixed for larger screens
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' }, // Stack links vertically on mobile, horizontally on larger screens
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Typography variant="body2" align="center" sx={{ fontWeight: 'bold', mb: { xs: 1, sm: 0 } }}>
                © 2024 HealthHub. All rights reserved.
            </Typography>
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    mt: { xs: 1, sm: 0 }, 
                    ml: { sm: 4 }, 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' } 
                }}
            >
                <Link 
                    href="#" 
                    color="inherit" 
                    sx={{ 
                        mx: { xs: 0, sm: 2 }, 
                        my: { xs: 0.5, sm: 0 }, 
                        textDecoration: 'none', 
                        '&:hover': {
                            textDecoration: 'underline',
                        }
                    }}
                >
                    Privacy Policy
                </Link>
                <Link 
                    href="#" 
                    color="inherit" 
                    sx={{ 
                        mx: { xs: 0, sm: 2 }, 
                        my: { xs: 0.5, sm: 0 }, 
                        textDecoration: 'none', 
                        '&:hover': {
                            textDecoration: 'underline',
                        }
                    }}
                >
                    Terms of Service
                </Link>
                <Link 
                    href="#" 
                    color="inherit" 
                    sx={{ 
                        mx: { xs: 0, sm: 2 }, 
                        my: { xs: 0.5, sm: 0 }, 
                        textDecoration: 'none', 
                        '&:hover': {
                            textDecoration: 'underline',
                        }
                    }}
                >
                    Contact Us
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
