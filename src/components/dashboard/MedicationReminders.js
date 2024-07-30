import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, Chip, Modal, Paper } from '@mui/material';
import { format } from 'date-fns';

/**
 * MedicationReminders component
 * 
 * This component displays a daily medication schedule with time and dosage, visual reminders for upcoming medication times, and quick action buttons to mark as taken or reorder.
 *
 * Props:
 * - medications (array): A list of medication objects containing name, dosage, time, and taken status.
 * - onMarkAsTaken (function): Function to handle marking medication as taken.
 * - onReorder (function): Function to handle reordering medication.
 *
 * Example usage:
 * <MedicationReminders 
 *    medications={[{ name: "Aspirin", dosage: "100mg", time: "08:00 AM", taken: false }]} 
 *    onMarkAsTaken={handleMarkAsTaken} 
 *    onReorder={handleReorder} 
 * />
 */
const MedicationReminders = ({ medications, onMarkAsTaken, onReorder }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedMedication, setSelectedMedication] = useState(null);

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
    };

    const handleCloseDetails = () => {
        setSelectedMedication(null);
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
                Daily Medication Schedule
            </Typography>
            <List>
                {medications.map((medication, index) => (
                    <ListItem 
                        key={index} 
                        divider 
                        button
                        onClick={() => handleViewDetails(medication)}
                    >
                        <ListItemText
                            primary={`${medication.name} (${medication.dosage})`}
                            secondary={`Scheduled at ${medication.time}`}
                        />
                        <ListItemSecondaryAction>
                            {getStatusChip(medication.time, medication.taken)}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Modal open={!!selectedMedication} onClose={handleCloseDetails}>
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
                            <Box mt={2} display="flex" justifyContent="space-between">
                                <Button 
                                    onClick={() => { onMarkAsTaken(selectedMedication); handleCloseDetails(); }} 
                                    variant="outlined" 
                                    color="primary"
                                    fullWidth
                                    sx={{ mr: 1 }}
                                    disabled={selectedMedication.taken}
                                >
                                    Mark as Taken
                                </Button>
                                <Button 
                                    onClick={() => { onReorder(selectedMedication); handleCloseDetails(); }} 
                                    variant="outlined" 
                                    color="secondary"
                                    fullWidth
                                    sx={{ ml: 1 }}
                                >
                                    Reorder
                                </Button>
                            </Box>
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
