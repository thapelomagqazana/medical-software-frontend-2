/**
 * Importing necessary components.
 * - React: A JavaScript library for building user interfaces.
 * - Header, HeroSection, FeaturesSection, TestimonialsSection, CTASection, Footer: Custom components for different sections of the landing page.
 */
import React from "react";
import { Box } from "@mui/material";
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from "../components/landing/FeatureSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";

/**
 * LandingPage component.
 * - Combines all the sections of the landing page.
 * - Uses React fragments (<></>) to group multiple elements.
 */
const LandingPage = () => (
    <Box sx={{ paddingBottom: '150px' }}>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
    </Box>
);

export default LandingPage;