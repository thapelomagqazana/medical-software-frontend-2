import React from "react";
import { Box, Typography, Button, Modal, Paper } from "@mui/material";

const CancelModal = ({ open, handleClose, handleConfirm }) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Paper sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
                <Typography 
                    variant="h6"                                     
                    mb={2}
                    gutterBottom 
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    Confirm Cancellation
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Are you sure you want to cancel this appointment?
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button onClick={handleClose} variant="outlined" color="secondary">
                        No
                    </Button>
                    <Button onClick={handleConfirm} variant="contained" color="primary">
                        Yes, Cancel
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
};

export default CancelModal;