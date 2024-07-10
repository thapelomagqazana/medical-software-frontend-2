import React from 'react';
import { Alert } from '@mui/material';

const ErrorAlert = ({ message }) => (
    <Alert severity="error" sx={{ mt: 2 }}>
        {message}
    </Alert>
);

export default ErrorAlert;
