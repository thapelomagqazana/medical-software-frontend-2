/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled/macro": A library for writing CSS styles with JavaScript.
 * - Link from "react-router-dom": A component for navigation links.
 * - AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText from "@mui/material": Material-UI components.
 * - AccountCircle and MenuIcon from "@mui/icons-material": Icons for the user profile and menu.
 * - useSelector and useDispatch from "react-redux": Hooks to access the Redux store's state and dispatch actions.
 */
import React from 'react';
import styled from '@emotion/styled/macro';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';


/**
 * Styled component for individual header links.
 * - text-decoration: Removes the underline from the link.
 * - color: Sets the link color.
 * - font-weight: Sets the font weight to bold.
 * - &:hover: Changes the link color on hover.
 */
const HeaderLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  &:hover {
    color: #007BFF;
  }
`;

/**
 * Styled component for the call-to-action buttons.
 * - media query: Adjusts the layout for screens with a width of 768px or less.
 */
const CTAButtons = styled.div`
  display: flex;
  gap: 10px;

`;

/**
 * Main component for the header.
 * - AppBar: The main container for the header.
 * - Toolbar: A container for organizing the header content.
 * - Typography: A styled component for the logo.
 * - IconButton: A button for the user profile menu.
 * - Menu: A dropdown menu for the user profile settings.
 * - Drawer: A sidebar for navigation links on all screen sizes.
 */
const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const displayProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate("/sign-in");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: '#ffffff', color: '#007BFF' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <HeaderLink to="/">HealthHub</HeaderLink>
        </Typography>
        
        {isAuthenticated ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
                <ListItem button component={Link} to="/dashboard" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/your-appointments" onClick={toggleDrawer(false)}>
                  <ListItemText primary="Appointments" />
                </ListItem>
                {/* <ListItem button component={Link} to="/medications" onClick={toggleDrawer(false)}>
                <ListItemText primary="Medications" />
                </ListItem>
                <ListItem button component={Link} to="/records" onClick={toggleDrawer(false)}>
                <ListItemText primary="Records" />
                </ListItem>
                <ListItem button component={Link} to="/messages" onClick={toggleDrawer(false)}>
                <ListItemText primary="Messages" />
                </ListItem>
                <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
                <ListItemText primary="Settings" />
                </ListItem> */}
            </List>
            </Drawer>
            <IconButton edge="end" color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={displayProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <CTAButtons>
            <Button component={Link} to="/sign-in" variant="outlined" color="primary">
              Sign In
            </Button>
            <Button component={Link} to="/sign-up" variant="contained" color="primary">
              Sign Up
            </Button>
          </CTAButtons>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
