import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";


const PatientDetailModal = ({ patient, open, onClose }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Patient Details</DialogTitle>
        <DialogContent>
            <Typography variant="h6">{patient.firstName} {patient.lastName}</Typography>
            <Typography variant="body2">Email: {patient.email}</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">Close</Button>
        </DialogActions>
    </Dialog>
);

export default PatientDetailModal;