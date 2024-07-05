/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled": A library for writing CSS styles with JavaScript.
 * - useDispatch, useSelector from "react-redux": Hooks for interacting with the Redux store.
 * - Typography, TextField, Button, Container, Box, Link from "@mui/material": Material-UI components.
 * - Formik, Form, Field from "formik": A library for handling forms in React.
 * - Yup: A library for schema validation.
 * - login: The login action from the authSlice in Redux.
 * - Link, useNavigate from "react-router-dom": Components for navigation and programmatic navigation.
 */
import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Container, Box, Link as MuiLink } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../redux/authSlice";
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
 * Validation schema for the login form.
 * - email: Must be a valid email and is required.
 * - password: Is required.
 */
const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

/**
 * Main component for the login page.
 * - useDispatch: Hook to get the dispatch function from the Redux store.
 * - useSelector: Hook to get the error state from the auth slice in the Redux store.
 * - Formik: Handles the form state and validation.
 * - initialValues: Sets the initial values for the form fields.
 * - validationSchema: Uses the LoginSchema for validation.
 * - onSubmit: Dispatches the login action with the form values.
 * - errors, touched: Formik properties to handle validation errors and touched fields.
 */
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);

    return (
        <FormContainer>
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const result = await dispatch(login(values)).unwrap();
                        if (result.token) {
                            navigate("/dashboard"); // Redirect to the dashboard
                        }
                    } catch (err) {
                        console.error("Failed to login:", err);
                    } finally {
                        setSubmitting(false); // Set submitting to false after submission is complete
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
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


                        {error && <Box color="error.main" mb={2}>{error.msg}</Box>}
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                            Log In
                        </Button>
                    </Form>
                )}
            </Formik>
            <MuiLink component={Link} mt={2}>
                Forgot Password?
            </MuiLink>
            <Box mt={2}>
                <Link to="/sign-up">Don't have an account? Sign Up.</Link>
            </Box>
        </FormContainer>
    );
};

export default Login;
