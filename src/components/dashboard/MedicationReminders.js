import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal, Paper, Chip, Menu, MenuItem, Button } from '@mui/material';
import PillIcon from '@mui/icons-material/LocalPharmacy';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const MedicationReminders = ({ medications, onMarkAsTaken, onReorder }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // Update current time every minute
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const getStatusChip = (time, taken) => {
        const medTime = new Date();
        const [hours, minutes] = time.split(':');
        medTime.setHours(parseInt(hours));
        medTime.setMinutes(parseInt(minutes));

        if (taken) {
            return <Chip label="Taken" color="success" />;
        }

        if (currentTime > medTime) {
            return <Chip label="Missed" color="error" />;
        }

        if (currentTime < medTime) {
            return <Chip label="Upcoming" color="warning" />;
        }

        return <Chip label="Now" color="primary" />;
    };

    const handleViewDetails = (medication) => {
        setSelectedMedication(medication);
        setIsModalOpen(true);
        setAnchorEl(null); // Close the options menu when viewing details
    };

    const handleCloseDetails = () => {
        setIsModalOpen(false);
    };

    const handleOptionsClick = (event, medication) => {
        event.stopPropagation();
        setSelectedMedication(medication);
        setAnchorEl(event.currentTarget);
    };

    const handleOptionsClose = () => {
        setAnchorEl(null);
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
                    <PillIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Daily Medication Schedule
                </Typography>
            </Box>
            <List>
                {medications.map((medication, index) => (
                    <ListItem 
                        key={index} 
                        divider 
                        button
                        onClick={() => handleViewDetails(medication)}
                        sx={{ 
                            cursor: 'pointer', 
                            '&:hover': { bgcolor: 'action.hover' },
                            '&:focus': { outline: 'none', bgcolor: 'action.selected' },
                            '&:active': { bgcolor: 'action.selected' }
                        }}
                    >
                        <ListItemText
                            primary={`${medication.name} (${medication.dosage})`}
                            secondary={`Scheduled at ${medication.time}`}
                        />
                        <ListItemSecondaryAction>
                            {getStatusChip(medication.time, medication.taken)}
                            <IconButton 
                                edge="end" 
                                color="inherit"
                                onClick={(e) => handleOptionsClick(e, medication)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl) && selectedMedication === medication}
                                onClose={handleOptionsClose}
                            >
                                <MenuItem onClick={() => { handleOptionsClose(); onMarkAsTaken(medication); }}>
                                    <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} /> Mark as Taken
                                </MenuItem>
                                <MenuItem onClick={() => { handleOptionsClose(); onReorder(medication); }}>
                                    <AddShoppingCartIcon fontSize="small" sx={{ mr: 1 }} /> Reorder
                                </MenuItem>
                            </Menu>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Modal open={isModalOpen} onClose={handleCloseDetails}>
                <Paper sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2 }}>
                    {selectedMedication && (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Medication Details
                            </Typography>
                            <Typography variant="body1">
                                <strong>Name:</strong> {selectedMedication.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Dosage:</strong> {selectedMedication.dosage}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Scheduled Time:</strong> {selectedMedication.time}
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

export default MedicationReminders;
