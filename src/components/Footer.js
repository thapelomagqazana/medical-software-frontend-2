/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled": A library for writing CSS styles with JavaScript.
 * - Link from "react-router-dom": A component for navigation links.
 * - IconButton from "@mui/material": A Material-UI component for icon buttons.
 * - Icons from "@mui/icons-material": Material-UI icons for social media links.
 */
import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

/**
 * Styled component for the footer container.
 * - padding: Adds space inside the container.
 * - background-color: Sets the background color.
 * - color: Sets the text color.
 * - display: Sets the layout to flexbox.
 * - justify-content: Distributes space between items.
 * - flex-wrap: Allows items to wrap onto multiple lines.
 * - media query: Adjusts the layout for screens with a width of 768px or less.
 */
const FooterContainer = styled.footer`
  padding: 20px;
  background-color: #333333;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

/**
 * Styled component for the navigation links in the footer.
 * - display: Sets the layout to flexbox.
 * - gap: Adds space between items.
 * - media query: Adjusts the layout for screens with a width of 768px or less.
 */
const FooterLinks = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

/**
 * Styled component for individual footer links.
 * - text-decoration: Removes the underline from the link.
 * - color: Sets the link color.
 * - &:hover: Changes the link color on hover.
 */
const FooterLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  &:hover {
    color: #007BFF;
  }
`;

/**
 * Styled component for social media icon buttons.
 * - &:hover: Changes the icon color on hover.
 */
const SocialLink = styled(IconButton)`
    &:hover {
        color: #007BFF;
    }
`;

/**
 * Styled component for the container of social media icons.
 * - display: Sets the layout to flexbox.
 * - gap: Adds space between items.
 * - media query: Adjusts the layout for screens with a width of 768px or less.
 */
const SocialIcons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

/**
 * Main component for the footer.
 * - FooterContainer: The main container for the footer.
 * - FooterLinks: A styled component for the navigation links.
 * - FooterLink: A styled component for individual navigation links.
 * - SocialIcons: A styled component for the social media icons.
 * - SocialLink: A styled component for individual social media icon buttons.
 * - Icons: Various social media icons from Material-UI.
 */
const Footer = () => (
  <FooterContainer>
    <FooterLinks aria-label="Footer Navigation Links">
      <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
      <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
    </FooterLinks>
    <SocialIcons>
        <SocialLink aria-label="Facebook" href="https://www.facebook.com" target="_blank" color="inherit">
            <FacebookIcon />
        </SocialLink>
        <SocialLink aria-label="Twitter" href="https://www.twitter.com" target="_blank" color="inherit">
            <TwitterIcon />
        </SocialLink>
        <SocialLink aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank" color="inherit">
            <LinkedInIcon />
        </SocialLink>
        <SocialLink aria-label="Instagram" href="https://www.instagram.com" target="_blank" color="inherit">
            <InstagramIcon />
        </SocialLink>
    </SocialIcons>
  </FooterContainer>
);


export default Footer;
