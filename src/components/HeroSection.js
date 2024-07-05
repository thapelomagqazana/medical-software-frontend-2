/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled/macro": A library for writing CSS styles with JavaScript.
 * - Button, Typography from "@mui/material": Material-UI components.
 * - backgroundImage: Importing a background image for the hero section.
 */
import React from "react";
import styled from "@emotion/styled/macro";
import { Button, Typography } from "@mui/material";
import backgroundImage from '../assets/images/pexels-olly-3952375.jpg';

/**
 * Styled component for the hero container.
 * - background: Sets the background image with no-repeat, center alignment, and cover size.
 * - height: Sets the height to 100vh (full viewport height).
 * - display: Sets the layout to flexbox.
 * - flex-direction: Aligns items in a column.
 * - justify-content: Centers items vertically.
 * - align-items: Centers items horizontally.
 * - color: Sets the text color.
 * - text-align: Centers the text.
 * - padding: Adds padding inside the container.
 * - media query: Adjusts the padding for screens with a width of 768px or less.
 */
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

/**
 * Styled component for the hero button.
 * - margin-top: Adds space above the button.
 * - padding: Adds space inside the button.
 * - background-color: Sets the button's background color.
 * - &:hover: Changes the background color when the button is hovered over.
 */
const HeroButton = styled(Button)`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    &:hover {
        background-color: #0056b3;
    }
`;

/**
 * Main component for the hero section.
 * - HeroContainer: The main container for the hero section.
 * - Typography: Displays the main heading and subheading with responsive font sizes.
 * - HeroButton: A styled button with hover effects.
 */
const HeroSection = () => (
    <HeroContainer>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>Streamline Your Medical Practice</Typography>
        <Typography variant="h5" component="p" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>Efficient, Innovative, and Reliable Medical Software Solutions</Typography>
        <HeroButton variant="contained" color="primary">Learn More</HeroButton>
    </HeroContainer>
);

export default HeroSection;