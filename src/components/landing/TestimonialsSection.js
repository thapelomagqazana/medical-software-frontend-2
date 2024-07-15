/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled/macro": A library for writing CSS styles with JavaScript.
 * - Typography from "@mui/material": A Material-UI component for typography.
 * - Carousel from "react-responsive-carousel": A library for creating carousels.
 * - "carousel.min.css": The CSS file for styling the carousel.
 */
import React from "react";
import { Typography, Avatar, Box, Paper } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import drJohnDoe from "../../assets/images/pexels-mikhail-nilov-8942090.jpg";
import drJaneSmith from "../../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg";
import drRobertBrown from "../../assets/images/pexels-gustavo-fring-5622280.jpg";
import drEmilyWhite from "../../assets/images/pexels-olly-3952375.jpg";


/**
 * Array of testimonial objects, each containing a quote, name, and image.
 * - quote: The testimonial text.
 * - name: The name of the person giving the testimonial.
 *
 */
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

/**
 * Main component for the testimonials section.
 * - TestimonialsContainer: The main container for the testimonials section.
 * - Typography: Displays the section title.
 * - Carousel: A responsive carousel component to cycle through testimonials.
 * - TestimonialItem: A styled component for each testimonial.
 * - testimonials.map: Iterates over the testimonials array to create carousel items for each testimonial.
 */
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