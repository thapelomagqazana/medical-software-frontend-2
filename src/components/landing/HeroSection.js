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
import backgroundVideo from '../../assets/videos/5356074-uhd_3840_2160_25fps.mp4';

/**
 * Styled component for the hero container.
 * - position: relative to position child elements absolutely within it.
 * - height: Sets the height to 100vh (full viewport height).
 * - display: Sets the layout to flexbox.
 * - flex-direction: Aligns items in a column.
 * - justify-content: Centers items vertically.
 * - align-items: Centers items horizontally.
 * - color: Sets the text color.
 * - text-align: Centers the text.
 * - padding: Adds padding inside the container.
 * - media query: Adjusts the padding for screens with a width of 768px or less.
 * - z-index: Ensures content appears above the video.
 */
const HeroContainer = styled.section`
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
    padding: 0 20px;
    z-index: 1;

    @media (max-width: 768px) {
        padding: 0 10px;
    }

    &:before {
        content: "",
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4); /* Dark overlay for better text contrast */
        z-index: -1;
    }
`;

/**
 * Styled component for the background video.
 * - position: absolute to cover the entire hero container.
 * - width and height: Ensures the video covers the full viewport.
 * - object-fit: Ensures the video covers the area without distortion.
 * - z-index: -2 to place the video behind other content.
 */
const BackgroundVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -2;
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
 * - BackgroundVideo: The video element for the background.
 * - Typography: Displays the main heading and subheading with responsive font sizes.
 * - HeroButton: A styled button with hover effects.
 * - Accessibility: Adds aria-label for better accessibility.
 */
const HeroSection = () => (
    <HeroContainer aria-label="Hero Section">
        <BackgroundVideo autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </BackgroundVideo>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>Streamline Your Medical Practice</Typography>
        <Typography variant="h5" component="p" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>Efficient, Innovative, and Reliable Medical Software Solutions</Typography>
        <HeroButton variant="contained" color="primary">Learn More</HeroButton>
    </HeroContainer>
);

export default HeroSection;