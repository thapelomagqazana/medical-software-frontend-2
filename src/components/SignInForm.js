/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled": A library for writing CSS styles with JavaScript.
 * - useDispatch, useSelector from "react-redux": Hooks for interacting with the Redux store.
 * - Typography, TextField, Button, Container, Box, Link from "@mui/material": Material-UI components.
 * - Formik, Form, Field from "formik": A library for handling forms in React.
 * - Yup: A library for schema validation.
 * - login: The login action from the authSlice in Redux.
 * - Link from "react-router-dom": A component for navigation links.
 */
import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Container, Box, Link as MuiLink } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../redux/authSlice";
import { Link } from "react-router-dom";

/**
 * Styled component for the form container.
 * - display: Sets the layout to flexbox.
 * - flex-direction: Aligns items in a column.
 * - align-items: Centers the items.
 * - padding: Adds padding inside the container.
 */
const FormContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
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
    const error = useSelector((state) => state.auth.error);

    return (
        <FormContainer maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Sign In
            </Typography>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    // console.log(values)
                    dispatch(login(values));
                }}
            >
                {({ errors, touched }) => (
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
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
