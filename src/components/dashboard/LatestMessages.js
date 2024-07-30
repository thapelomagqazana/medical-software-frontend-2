import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Modal, Paper, IconButton } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MailIcon from '@mui/icons-material/Mail';
import ReplyIcon from '@mui/icons-material/Reply';
import { format } from 'date-fns';

/**
 * LatestMessages component
 * 
 * This component displays the latest messages from doctors, with visual indicators for new/unread messages and quick action buttons to reply or mark as read.
 *
 * Props:
 * - messages (array): A list of message objects containing doctorName, content, timestamp, and read status.
 * - onReply (function): Function to handle replying to a message.
 * - onMarkAsRead (function): Function to handle marking a message as read.
 *
 * Example usage:
 * <LatestMessages 
 *    messages={[{ doctorName: "Dr. Alice Smith", content: "Please remember to take your medication.", timestamp: "2021-09-15T14:48:00.000Z", read: false }]} 
 *    onReply={handleReply} 
 *    onMarkAsRead={handleMarkAsRead} 
 * />
 */
const LatestMessages = ({ messages, onReply, onMarkAsRead }) => {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleViewDetails = (message) => {
        setSelectedMessage(message);
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
            <Typography 
                variant="h5"
                mb={2}
                gutterBottom 
                sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
                Latest Messages from Doctors
            </Typography>
            <List>
                {messages.slice(0, 5).map((message, index) => (
                    <ListItem 
                        key={index} 
                        divider 
                        button
                        onClick={() => handleViewDetails(message)}
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
                                color="primary"
                                onClick={(e) => { e.stopPropagation(); onReply(message); }}
                                sx={{ ml: 2 }}
                            >
                                <ReplyIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Modal open={!!selectedMessage} onClose={handleCloseDetails}>
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
