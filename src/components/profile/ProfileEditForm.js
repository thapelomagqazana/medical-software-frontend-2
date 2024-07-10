import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
});

const ProfileEditForm = ({ profileData, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            phone: profileData.phone,
            address: profileData.address,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
                Edit Profile
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    name="firstName"
                    label="First Name"
                    fullWidth
                    margin="normal"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && !!formik.errors.firstName}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && !!formik.errors.lastName}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                    name="email"
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                />
                {/* <TextField
                    name="phone"
                    label="Phone"
                    fullWidth
                    margin="normal"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && !!formik.errors.phone}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
                <TextField
                    name="address"
                    label="Address"
                    fullWidth
                    margin="normal"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && !!formik.errors.address}
                    helperText={formik.touched.address && formik.errors.address}
                /> */}
                <Box mt={2}>
                    <Button variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
                        Save
                    </Button>
                    <Button variant="outlined" color="primary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ProfileEditForm;
