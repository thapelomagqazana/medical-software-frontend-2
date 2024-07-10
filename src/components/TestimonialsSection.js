/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled/macro": A library for writing CSS styles with JavaScript.
 * - Typography from "@mui/material": A Material-UI component for typography.
 * - Carousel from "react-responsive-carousel": A library for creating carousels.
 * - "carousel.min.css": The CSS file for styling the carousel.
 */
import React from "react";
import styled from "@emotion/styled/macro";
import { Typography, Avatar } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import drJohnDoe from "../assets/images/pexels-mikhail-nilov-8942090.jpg";
import drJaneSmith from "../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg";
import drRobertBrown from "../assets/images/pexels-gustavo-fring-5622280.jpg";
import drEmilyWhite from "../assets/images/pexels-olly-3952375.jpg";

// Import images
// import drJohnDoe from '../assets/images/medium-shot-female-nurse-hospital.jpg';
// import drJaneSmith from '../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg';
// import drRobertBrown from '../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg';

/**
 * Styled component for the testimonials container.
 * - padding: Adds space inside the container.
 * - background-color: Sets the background color.
 * - media query: Adjusts the padding for screens with a width of 768px or less.
 */
const TestimonialsContainer = styled.section`
    padding: 50px 20px;
    background-color: #ffffff;

    @media (max-width: 768px) {
        padding: 30px 10px;
    }
`;

/**
 * Styled component for individual testimonial items.
 * - text-align: Centers the text inside the testimonial item.
 * - margin: Adds space around the testimonial item.
 */
const TestimonialItem =  styled.div`
    text-align: center;
    margin: 20px;
    padding: 20px;
    background-color: #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;


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
const TestimonialsSection = () => (
    <TestimonialsContainer>
      <Typography variant="h4" gutterBottom align="center">Testimonials</Typography>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
        {testimonials.map((testimonial, index) => (
            <TestimonialItem key={index}>
              <Avatar 
                sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} 
                src={testimonial.image} 
                alt={testimonial.name} 
              />
              <Typography variant="h6">"{testimonial.quote}"</Typography>
              <Typography>- {testimonial.name}</Typography>
            </TestimonialItem>
        ))}
      </Carousel>
    </TestimonialsContainer>
);
  
export default TestimonialsSection;