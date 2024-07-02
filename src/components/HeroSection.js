import React from "react";
import styled from "@emotion/styled/macro";
import { Button, Typography } from "@mui/material";
import backgroundImage from '../assets/images/pexels-olly-3952375.jpg';

const HeroContainer = styled.section`
    background: url(${backgroundImage}) no-repeat center center/cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
    padding: 0 20px;

    @media (max-width: 768px) {
        padding: 0 10px;
    }
`;

const HeroButton = styled(Button)`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    &:hover {
        background-color: #0056b3;
    }
`;

const HeroSection = () => (
    <HeroContainer>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>Streamline Your Medical Practice</Typography>
        <Typography variant="h5" component="p" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>Efficient, Innovative, and Reliable Medical Software Solutions</Typography>
        <HeroButton variant="contained" color="primary">Learn More</HeroButton>
    </HeroContainer>
);

export default HeroSection;