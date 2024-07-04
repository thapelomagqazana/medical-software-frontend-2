import React from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Container, Box, Link as MuiLink } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../redux/authSlice";
import { Link } from "react-router-dom";

const FormContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

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
