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
import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
`;

/**
 * Styled component for testimonial images.
 * - border-radius: Rounds the corners to create a circular image.
 * - width: Sets the width of the image.
 * - margin-bottom: Adds space below the image.
 * - object-fit: Ensures the image covers the area without distortion.
 * - media query: Adjusts the width for screens with a width of 768px or less.
 */
const TestimonialImage = styled.img`
    border-radius: 50%;
    width: 60px;
    margin-bottom: 20px;
    object-fit: cover;
    @media (max-width: 768px) {
      width: 60px;
    }
`;

/**
 * Array of testimonial objects, each containing a quote, name, and image.
 * - quote: The testimonial text.
 * - name: The name of the person giving the testimonial.
 * - image: The image of the person giving the testimonial (uncomment image paths when available).
 */
const testimonials = [
    {
      quote: "This software is amazing and has transformed our practice!",
      name: "Dr. John Doe",
      // image: drJohnDoe
    },
    {
      quote: "The best tool we've ever used for managing patient appointments.",
      name: "Dr. Jane Smith",
      // image: drJaneSmith 
    },
    {
      quote: "It has made communication with patients so much easier.",
      name: "Dr. Robert Brown",
      // image: drRobertBrown
    },
    {
      quote: "Our staff loves the efficiency this software brings.",
      name: "Dr. Emily White",
      // image: drJohnDoe
    }
];

/**
 * Main component for the testimonials section.
 * - TestimonialsContainer: The main container for the testimonials section.
 * - Typography: Displays the section title.
 * - Carousel: A responsive carousel component to cycle through testimonials.
 * - TestimonialItem: A styled component for each testimonial.
 * - TestimonialImage: A styled component for the testimonial images.
 * - testimonials.map: Iterates over the testimonials array to create carousel items for each testimonial.
 */
const TestimonialsSection = () => (
    <TestimonialsContainer>
      <Typography variant="h4" gutterBottom align="center">Testimonials</Typography>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop useKeyboardArrows autoPlay>
        {testimonials.map((testimonial, index) => (
            <TestimonialItem key={index}>
            <TestimonialImage src={testimonial.image} alt={testimonial.name} />
            <Typography variant="h6">"{testimonial.quote}"</Typography>
            <Typography>- {testimonial.name}</Typography>
            </TestimonialItem>
        ))}
      </Carousel>
    </TestimonialsContainer>
);
  
export default TestimonialsSection;