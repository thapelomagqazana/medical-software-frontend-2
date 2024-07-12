/**
 * Importing necessary libraries and components.
 * - React, { useEffect }: A JavaScript library for building user interfaces and useEffect hook for side effects.
 * - styled from "@emotion/styled": A library for writing CSS styles with JavaScript.
 * - useDispatch, useSelector from "react-redux": Hooks for interacting with the Redux store.
 * - Typography, TextField, Button, Container, Box, MenuItem from "@mui/material": Material-UI components.
 * - Formik, Form, Field from "formik": A library for handling forms in React.
 * - Yup: A library for schema validation.
 * - register, clearRegistrationSuccess: Actions from the authSlice in Redux.
 * - Link, useNavigate from "react-router-dom": Components for navigation.
 */
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Container, Box, MenuItem, Link as MuiLink } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register, clearRegistrationSuccess } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

/**
 * Styled component for the form container.
 * - display: Sets the layout to flexbox.
 * - flex-direction: Aligns items in a column.
 * - align-items: Centers the items.
 * - padding: Adds padding inside the container.
 * - max-width: Limits the maximum width of the container.
 * - box-shadow: Adds a shadow effect to the container.
 * - border-radius: Rounds the corners of the container.
 * - background-color: Sets the background color.
 */
const FormContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    max-width: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #ffffff;
    margin-top: 50px;
`;


/**
 * Validation schema for the sign-up form.
 * - firstName: Must be provided.
 * - lastName: Must be provided.
 * - email: Must be a valid email and is required.
 * - password: Must be at least 6 characters and is required.
 * - confirmPassword: Must match the password field and is required.
 * - role: Must be one of 'patient', 'doctor', or 'admin' and is required.
 */
const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], 'Passwords must match').required("Confirm Password is required"),
    role: Yup.string().oneOf(['patient', 'doctor', 'admin'], 'Invalid role').required('Role is required'),
});

/**
 * Main component for the sign-up page.
 * - useDispatch: Hook to get the dispatch function from the Redux store.
 * - useSelector: Hook to get the error and registrationSuccess states from the auth slice in the Redux store.
 * - useNavigate: Hook to navigate programmatically.
 * - useEffect: Hook to handle side effects, here it redirects after successful registration.
 * - Formik: Handles the form state and validation.
 * - initialValues: Sets the initial values for the form fields.
 * - validationSchema: Uses the SignUpSchema for validation.
 * - onSubmit: Dispatches the register action with the form values.
 * - errors, touched: Formik properties to handle validation errors and touched fields.
 */
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
        <FormContainer>
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            {registrationSuccess && <Box color="success.main" mb={2}>Registration successful! Redirecting to login...</Box>}
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
                <MuiLink component={Link} to="/sign-in">Already have an account? Log In.</MuiLink>
            </Box>
        </FormContainer>
    );
};


export default SignUp;