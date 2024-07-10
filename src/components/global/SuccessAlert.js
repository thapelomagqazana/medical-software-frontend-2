import React from "react";
import { Alert } from "@mui/material";

const SuccessAlert = ({ message }) => (
    <Alert severity="success" sx={{ mt: 2 }}>
        {message}
    </Alert>
);

export default SuccessAlert;