import React from "react";
import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const CTAContainer = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9;
    text-align: center;

    @media (max-width: 768px) {
        padding: 30px 10px;
    }
`;

const CTAButton = styled(Button)`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    &:hover {
        background-color: #0056b3;
    }
`;

const CTAForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const CTASection = () => {
    const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    });
  
    return (
      <CTAContainer>
        <Typography variant="h4" gutterBottom>Request a Demo</Typography>
        <Formik
          initialValues={{ name: '', email: '', message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // handle form submission
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <CTAForm>
              <Field 
                as={TextField} 
                name="name" 
                label="Name" 
                error={touched.name && !!errors.name} 
                helperText={touched.name && errors.name} 
              />

              <Field 
                as={TextField} 
                name="email" 
                label="Email" 
                error={touched.email && !!errors.email} 
                helperText={touched.email && errors.email} 
              />

              <Field 
                as={TextField} 
                name="message" 
                label="Message" 
                multiline rows={4} 
              />

              <CTAButton type="submit" variant="contained" color="primary">Request Demo</CTAButton>
            </CTAForm>
          )}
        </Formik>
      </CTAContainer>
    );
  };
  
  export default CTASection;