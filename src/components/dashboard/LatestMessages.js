import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal, Paper, Menu, MenuItem, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailIcon from '@mui/icons-material/Mail';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format } from 'date-fns';

const LatestMessages = ({ messages, onReply, onMarkAsRead }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOptionsClick = (event, message) => {
        if (event) {
            event.stopPropagation();
        }
        setSelectedMessage(message);
        setAnchorEl(event ? event.currentTarget : null);
    };

    const handleOptionsClose = () => {
        setAnchorEl(null);
        setSelectedMessage(null); // Reset selected message when the menu is closed
    };

    const handleViewDetails = () => {
        setAnchorEl(null); // Close the menu before opening the modal
    };

    const handleCloseDetails = () => {
        setSelectedMessage(null);
    };

    return (
        <Box 
            textAlign="center" 
            my={{ xs: 2, md: 4 }} 
            p={{ xs: 2, md: 4 }} 
            bgcolor="background.paper" 
            borderRadius={2} 
            boxShadow={3}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography 
                    variant="h5"
                    mb={2}
                    gutterBottom 
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    <MailIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Latest Messages from Doctors
                </Typography>
            </Box>
            <List>
                {messages.slice(0, 5).map((message, index) => (
                    <ListItem 
                        key={index} 
                        divider 
                        button
                        onClick={() => handleOptionsClick(null, message)} // Handle click to view message details
                        sx={{ 
                            cursor: 'pointer', 
                            '&:hover': { bgcolor: 'action.hover' },
                            '&:focus': { outline: 'none', bgcolor: 'action.selected' },
                            '&:active': { bgcolor: 'action.selected' }
                        }}
                    >
                        <ListItemText
                            primary={`From: ${message.doctorName}`}
                            secondary={`${message.content.substring(0, 30)}...`}
                        />
                        <ListItemSecondaryAction>
                            <IconButton 
                                edge="end" 
                                color={message.read ? 'default' : 'primary'}
                                onClick={(e) => { e.stopPropagation(); onMarkAsRead(message); }}
                                sx={{ ml: 2 }}
                            >
                                {message.read ? <MailIcon /> : <MailOutlineIcon />}
                            </IconButton>
                            <IconButton 
                                edge="end" 
                                color="inherit"
                                onClick={(e) => handleOptionsClick(e, message)}
                                sx={{ ml: 2 }}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && selectedMessage === message}
                                onClose={handleOptionsClose}
                            >
                                <MenuItem onClick={handleViewDetails}>
                                    <ReplyIcon fontSize="small" sx={{ mr: 1 }} /> Reply
                                </MenuItem>
                                <MenuItem onClick={handleViewDetails}>
                                    <MailIcon fontSize="small" sx={{ mr: 1 }} /> View Details
                                </MenuItem>
                            </Menu>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Modal open={!!selectedMessage && !anchorEl} onClose={handleCloseDetails}>
                <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
                    {selectedMessage && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Message Details
                            </Typography>
                            <Typography variant="body1">
                                <strong>From:</strong> {selectedMessage.doctorName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Content:</strong> {selectedMessage.content}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Received:</strong> {format(new Date(selectedMessage.timestamp), 'PPP p')}
                            </Typography>
                            <Box mt={2}>
                                <Button onClick={handleCloseDetails} variant="contained" color="primary" fullWidth>
                                    Close
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>
        </Box>
    );
};

export default LatestMessages;
