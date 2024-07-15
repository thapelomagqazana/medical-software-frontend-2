import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        console.log("Hi");
        // dispatch(logout());
        // navigate('/sign-in');
    };

    const authMenuItems = [
        { text: 'Dashboard', icon: <HomeIcon />, link: '/' },
        { text: 'Appointments', icon: <EventIcon />, link: '/your-appointments' },
        { text: 'Medical Records', icon: <DescriptionIcon />, link: '/medical-records' },
        { text: 'Medications', icon: <LocalPharmacyIcon />, link: '/medications' },
        { text: 'Health Tracking', icon: <FitnessCenterIcon />, link: '/health-tracking' },
        { text: 'Messages', icon: <MessageIcon />, link: '/messages' },
        { text: 'Profile', icon: <AccountCircleIcon />, link: '/profile' },
        { text: 'Log Out', icon: <LogoutIcon />, action: handleLogout },
    ];

    const unauthMenuItems = [
        { text: 'Home', icon: <HomeIcon />, link: '/' },
        { text: 'Sign In', icon: <LoginIcon />, link: '/sign-in' },
        { text: 'Sign Up', icon: <AppRegistrationIcon />, link: '/sign-up' },
    ];

    const menuItems = isAuthenticated ? authMenuItems : unauthMenuItems;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    HealthHub
                </Typography>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        {menuItems.map((item) => (
                            item.link ? (
                                <Button
                                    key={item.text}
                                    color="inherit"
                                    component={Link}
                                    to={item.link}
                                    sx={{ fontWeight: location.pathname === `${item.link}` ? 'bold' : 'normal', margin: '0 8px', mx: 2, 
                                        textDecoration: 'none', 
                                        '&:hover': {
                                            textDecoration: 'underline',
                                    } }}
                                >
                                    {item.text}
                                </Button>
                            ) : (
                                <Button
                                    key={item.text}
                                    color="inherit"
                                    onClick={item.action}
                                    sx={{ fontWeight: location.pathname === `${item.link}` ? 'bold' : 'normal', margin: '0 8px', mx: 2, 
                                        textDecoration: 'none', 
                                        '&:hover': {
                                            textDecoration: 'underline',
                                    } }}
                                >
                                    {item.text}
                                </Button>
                            )
                        ))}
                </Box>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer}
                        onKeyDown={toggleDrawer}
                    >
                        <List>
                            {menuItems.map((item) => (
                                item.link ? (
                                    <ListItem button key={item.text} component={Link} to={item.link}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                ) : (
                                    <ListItem button key={item.text} onClick={item.action}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                )
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
