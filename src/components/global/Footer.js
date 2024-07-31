import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box 
            sx={{ 
                backgroundColor: 'primary.dark', 
                color: 'white', 
                py: 4, 
                mt: 4, 
                position: 'fixed', 
                bottom: 0, 
                width: '100%', 
                textAlign: 'center',
                height: '80px' // define the height of the footer
            }}
        >
            <Typography variant="body2" align="center" sx={{ fontWeight: 'bold' }}>
                © 2024 HealthHub. All rights reserved.
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link 
                    href="#" 
                    color="inherit" 
                    sx={{ 
                        mx: 2, 
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
                        mx: 2, 
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
                        mx: 2, 
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
