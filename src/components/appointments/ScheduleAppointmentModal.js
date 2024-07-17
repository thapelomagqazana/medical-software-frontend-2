import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import AppointmentForm from "./AppointmentForm";
import { Schedule } from "@mui/icons-material";

const scheduleAppointmentModal = ({ open, handleClose, onSubmit, patientId }) => {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogContent>
                <AppointmentForm onSubmit={onSubmit} patientId={patientId} isSubmitting={false} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default scheduleAppointmentModal;