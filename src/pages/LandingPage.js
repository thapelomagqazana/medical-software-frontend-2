/**
 * Importing necessary components.
 * - React: A JavaScript library for building user interfaces.
 * - Header, HeroSection, FeaturesSection, TestimonialsSection, CTASection, Footer: Custom components for different sections of the landing page.
 */
import React from "react";
import Header from "../components/global/Header";
import HeroSection from '../components/HeroSection';
import FeaturesSection from "../components/FeatureSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/global/Footer";

/**
 * LandingPage component.
 * - Combines all the sections of the landing page.
 * - Uses React fragments (<></>) to group multiple elements.
 */
const LandingPage = () => (
    <>
        <Header />
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
    </>
);

export default LandingPage;