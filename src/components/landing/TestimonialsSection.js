import React from 'react';
import { Typography, Avatar, Box, Paper } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// Sample images for the testimonials (replace these with actual image imports)
import drJohnDoe from '../../assets/images/pexels-mikhail-nilov-8942090.jpg';
import drJaneSmith from '../../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg';
import drRobertBrown from '../../assets/images/pexels-gustavo-fring-5622280.jpg';
import drEmilyWhite from '../../assets/images/pexels-olly-3952375.jpg';

// Array of testimonial data
const testimonials = [
    {
        quote: "This software is amazing and has transformed our practice!",
        name: "Dr. John Doe",
        image: drJohnDoe
    },
    {
        quote: "The best tool we've ever used for managing patient appointments.",
        name: "Dr. Jane Smith",
        image: drJaneSmith
    },
    {
        quote: "It has made communication with patients so much easier.",
        name: "Dr. Robert Brown",
        image: drRobertBrown
    },
    {
        quote: "Our staff loves the efficiency this software brings.",
        name: "Dr. Emily White",
        image: drEmilyWhite
    }
];

const TestimonialsSection = () => {
    return (
        <Box py={8} bgcolor="background.default">
            <Typography variant="h4" align="center" gutterBottom>
                Testimonials
            </Typography>
            <Box mx="auto" maxWidth="md">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    transitionTime={500}
                    emulateTouch
                    showArrows={false}
                >
                    {testimonials.map((testimonial, index) => (
                        <Box key={index} p={2}>
                            <Paper 
                                sx={{ 
                                    padding: 4, 
                                    textAlign: 'center', 
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 3,
                                    },
                                    minHeight: '300px', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar 
                                    src={testimonial.image} 
                                    alt={testimonial.name} 
                                    sx={{ width: 80, height: 80, mb: 2 }} 
                                />
                                <Typography variant="body1" mb={2}>"{testimonial.quote}"</Typography>
                                <Typography variant="body2" color="textSecondary">- {testimonial.name}</Typography>
                            </Paper>
                        </Box>
                    ))}
                </Carousel>
            </Box>
        </Box>
    );
};

export default TestimonialsSection;
