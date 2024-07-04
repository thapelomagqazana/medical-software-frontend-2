import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Container, Box, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register, clearRegistrationSuccess } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const FormContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], 'Passwords must match').required("Confirm Password is required"),
    role: Yup.string().oneOf(['patient', 'doctor', 'admin'], 'Invalid role').required('Role is required'),
});

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);
    const registrationSuccess = useSelector((state) => state.auth.registrationSuccess);

    useEffect(() => {
        if (registrationSuccess) {
            setTimeout(() => {
                dispatch(clearRegistrationSuccess());
                navigate("/sign-in");
            }, 2000) // Redirect after 2 seconds
        }
    }, [registrationSuccess, dispatch, navigate]);

    return (
        <FormContainer maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            {registrationSuccess && <Box color="success.main" mb={2} style={{ color: 'green' }}>Registration successful! Redirecting to login...</Box>}
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: 'patient', // Default value
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    // console.log(values);
                    dispatch(register(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={touched.firstName && !!errors.firstName}
                            helperText={touched.firstName && errors.firstName}
                        />
                        <Field 
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={touched.lastName && !!errors.lastName}
                            helperText={touched.lastName && errors.lastName}
                        />
                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                        />
                        <Field
                            as={TextField}
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={touched.confirmPassword && !!errors.confirmPassword}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                        <Field
                            as={TextField}
                            name="role"
                            label="Role"
                            select
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={touched.role && !!errors.role}
                            helperText={touched.role && errors.role}
                        >
                            <MenuItem value="patient">Patient</MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Field>
                        {error && <Box color="error.main" mb={2}>{error.msg}</Box>}
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Form>
                )}

            </Formik>
            <Box mt={2}>
                <Link>Already have an account? Log In.</Link>
            </Box>

        </FormContainer>
    );
};

export default SignUp;