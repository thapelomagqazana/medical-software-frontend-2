import React from "react";
import styled from "@emotion/styled/macro";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 10px;
    }
`;

const NavLinks = styled.nav`
    display: flex;
    gap: 20px;
`;

const HeaderLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-weight: bold;
    &:hover {
        color: #007BFF;
    }
`;

const Header = () => (
    <HeaderContainer>
        <HeaderLink to="/">HealthHub</HeaderLink>
        <NavLinks>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink>Features</HeaderLink>
            <HeaderLink>About Us</HeaderLink>
            <HeaderLink>Contact</HeaderLink>
        </NavLinks>
    </HeaderContainer>
);

export default Header;