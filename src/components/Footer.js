import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

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

const FooterLinks = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterLinks>
      <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
      <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
    </FooterLinks>
    <SocialIcons>
        <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
            <FacebookIcon />
        </IconButton>
        <IconButton href="https://www.twitter.com" target="_blank" color="inherit">
            <TwitterIcon />
        </IconButton>
        <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
            <LinkedInIcon />
        </IconButton>
        <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
            <InstagramIcon />
        </IconButton>
    </SocialIcons>
  </FooterContainer>
);

export default Footer;
