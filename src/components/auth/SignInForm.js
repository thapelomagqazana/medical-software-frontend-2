import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, CircularProgress, Alert, Link as MuiLink, Container } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/authSlice";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/patient/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Container>
            <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(login(values));
                setSubmitting(false);
            }}
        >
            {({ errors, touched, isSubmitting }) => (
                <Box component={Form} sx={{ maxWidth: 400, mx: "auto", mt: 8, p: 4 }}>
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    <Field
                        as={TextField}
                        name="email"
                        label="Email"
                        fullWidth
                        margin="normal"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                    />
                    
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting} sx={{ mt: 2 }}>
                        {isSubmitting ? <CircularProgress size={24} /> : "Log In"}
                    </Button>
                </Box>
            )}
            </Formik>
            <Box mt={2}>
                <MuiLink component={Link} to="/patient/sign-up">Don't have an account? Sign Up.</MuiLink>
            </Box>
        </Container>
        
    );
};

export default LoginForm;
