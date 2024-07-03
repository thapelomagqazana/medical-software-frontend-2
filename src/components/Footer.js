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
    color: #007BFF;
  }
`;

const SocialLink = styled(IconButton)`
    &:hover {
        color: #007BFF;
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
        <SocialLink href="https://www.facebook.com" target="_blank" color="inherit">
            <FacebookIcon />
        </SocialLink>
        <SocialLink href="https://www.twitter.com" target="_blank" color="inherit">
            <TwitterIcon />
        </SocialLink>
        <SocialLink href="https://www.linkedin.com" target="_blank" color="inherit">
            <LinkedInIcon />
        </SocialLink>
        <SocialLink href="https://www.instagram.com" target="_blank" color="inherit">
            <InstagramIcon />
        </SocialLink>
    </SocialIcons>
  </FooterContainer>
);

export default Footer;
