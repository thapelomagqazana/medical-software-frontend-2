import React from "react";
import styled from "@emotion/styled/macro";
import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Import images
// import drJohnDoe from '../assets/images/medium-shot-female-nurse-hospital.jpg';
// import drJaneSmith from '../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg';
// import drRobertBrown from '../assets/images/pexels-tessy-agbonome-521343232-18828741.jpg';

const TestimonialsContainer = styled.section`
    padding: 50px 20px;
    background-color: #ffffff;

    @media (max-width: 768px) {
        padding: 30px 10px;
    }
`;

const TestimonialItem =  styled.div`
    text-align: center;
    margin: 20px;
`;

const TestimonialImage = styled.img`
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
`;

const testimonials = [
    {
      quote: "This software is amazing and has transformed our practice!",
      name: "Dr. John Doe",
    //   image: drJohnDoe
    },
    {
      quote: "The best tool we've ever used for managing patient appointments.",
      name: "Dr. Jane Smith",
    //   image: drJaneSmith 
    },
    {
      quote: "It has made communication with patients so much easier.",
      name: "Dr. Robert Brown",
    //   image: drRobertBrown
    },
    {
      quote: "Our staff loves the efficiency this software brings.",
      name: "Dr. Emily White",
      image: "/assets/images/dr-emily-white.jpg"
    }
];

const TestimonialsSection = () => (
    <TestimonialsContainer>
      <Typography variant="h4" gutterBottom>Testimonials</Typography>
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