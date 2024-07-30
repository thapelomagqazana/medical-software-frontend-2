import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const AvailableTimeSlots = ({ selectedDate, availableSlots, onSelectSlot }) => {
    return (
        <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>Available Time Slots</Typography>
            <List>
                {availableSlots.map((slot, index) => (
                    <ListItem button key={index} onClick={() => onSelectSlot(slot)} sx={{ backgroundColor: slot.selected ? 'primary.light' : 'background.paper', borderRadius: 2, mb: 1 }}>
                        <ListItemIcon>
                            <AccessTimeIcon color={slot.selected ? 'primary' : 'inherit'} />
                        </ListItemIcon>
                        <ListItemText primary={slot.time} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default AvailableTimeSlots;
