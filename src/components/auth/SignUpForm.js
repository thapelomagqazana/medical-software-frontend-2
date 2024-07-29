import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Container, Box, Typography, Link as MuiLink, Alert, LinearProgress, Stepper, Step, StepLabel } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { register, clearRegistrationSuccess } from "../../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

// Validation schema for the sign-up form
const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], 'Passwords must match').required("Confirm Password is required"),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    insuranceDetails: Yup.string().required('Insurance details are required'),
    emergencyContacts: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Emergency contact name is required'),
            phone: Yup.string().required('Emergency contact phone number is required'),
        })
    ).min(1, 'At least one emergency contact is required'),
});

const steps = ["Personal Information", "Account Details", "Emergency Contacts"];

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);
    const registrationSuccess = useSelector((state) => state.auth.registrationSuccess);

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (registrationSuccess) {
            setTimeout(() => {
                dispatch(clearRegistrationSuccess());
                navigate("/sign-in");
            }, 2000); // Redirect after 2 seconds
        }
    }, [registrationSuccess, dispatch, navigate]);

    const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
    const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

    return (
        <Container maxWidth="sm">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <LinearProgress variant="determinate" value={(activeStep / (steps.length - 1)) * 100} sx={{ mt: 2, mb: 4 }} />
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: '',
                    address: '',
                    dateOfBirth: '',
                    insuranceDetails: '',
                    emergencyContacts: [{ name: '', phone: '' }],
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    dispatch(register(values));
                }}
            >
                {({ errors, touched, values, isValid }) => (
                    <Form>
                        {registrationSuccess && <Alert severity="success" sx={{ mb: 2 }}>Registration successful! Redirecting to login...</Alert>}
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error.message}</Alert>}
                        
                        {activeStep === 0 && (
                            <div>
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
                                    name="phone"
                                    label="Phone Number"
                                    fullWidth
                                    margin="normal"
                                    error={touched.phone && !!errors.phone}
                                    helperText={touched.phone && errors.phone}
                                />
                                <Field
                                    as={TextField}
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    margin="normal"
                                    error={touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                />
                                <Field
                                    as={TextField}
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.dateOfBirth && !!errors.dateOfBirth}
                                    helperText={touched.dateOfBirth && errors.dateOfBirth}
                                />
                                <Field
                                    as={TextField}
                                    name="insuranceDetails"
                                    label="Insurance Details"
                                    fullWidth
                                    margin="normal"
                                    error={touched.insuranceDetails && !!errors.insuranceDetails}
                                    helperText={touched.insuranceDetails && errors.insuranceDetails}
                                />
                            </div>
                        )}
                        {activeStep === 1 && (
                            <div>
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
                            </div>
                        )}
                        {activeStep === 2 && (
                            <div>
                                <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                                    Emergency Contacts
                                </Typography>
                                <FieldArray
                                    name="emergencyContacts"
                                    render={(arrayHelpers) => (
                                        <div>
                                            {values.emergencyContacts.map((contact, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                                    <Field
                                                        as={TextField}
                                                        name={`emergencyContacts.${index}.name`}
                                                        label="Name"
                                                        fullWidth
                                                        margin="normal"
                                                        error={touched.emergencyContacts?.[index]?.name && !!errors.emergencyContacts?.[index]?.name}
                                                        helperText={touched.emergencyContacts?.[index]?.name && errors.emergencyContacts?.[index]?.name}
                                                        sx={{ marginRight: 2 }}
                                                    />
                                                    <Field
                                                        as={TextField}
                                                        name={`emergencyContacts.${index}.phone`}
                                                        label="Phone"
                                                        fullWidth
                                                        margin="normal"
                                                        error={touched.emergencyContacts?.[index]?.phone && !!errors.emergencyContacts?.[index]?.phone}
                                                        helperText={touched.emergencyContacts?.[index]?.phone && errors.emergencyContacts?.[index]?.phone}
                                                    />
                                                    <Button
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)}
                                                        sx={{ marginLeft: 2 }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            ))}
                                            <Button
                                                type="button"
                                                onClick={() => arrayHelpers.push({ name: '', phone: '' })}
                                                variant="outlined"
                                                sx={{ marginTop: 2 }}
                                            >
                                                Add Contact
                                            </Button>
                                        </div>
                                    )}
                                />
                            </div>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                            {activeStep > 0 && (
                                <Button onClick={handleBack} variant="contained" color="secondary">
                                    Back
                                </Button>
                            )}
                            {activeStep < steps.length - 1 ? (
                                <Button onClick={handleNext} variant="contained" color="primary">
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
                                    Submit
                                </Button>
                            )}
                        </Box>
                    </Form>
                )}
            </Formik>
            <Box mt={2}>
                <MuiLink component={Link} to="/sign-in">Already have an account? Log In.</MuiLink>
            </Box>
        </Container>
    );
};

export default SignUp;
