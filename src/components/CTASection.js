/**
 * Importing necessary libraries and components.
 * - React: A JavaScript library for building user interfaces.
 * - styled from "@emotion/styled": A library for writing CSS styles with JavaScript.
 * - Button, TextField, Typography from "@mui/material": Material-UI components.
 * - Formik, Form, Field from "formik": A library for handling forms in React.
 * - Yup: A library for schema validation.
 */
import React from "react";
import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

/**
 * Styled component for the main container of the call-to-action section.
 * - padding: Adds space inside the container.
 * - background-color: Sets the background color.
 * - text-align: Centers the text inside the container.
 * - media query: Adjusts the padding for screens with a width of 768px or less.
 */
const CTAContainer = styled.section`
    padding: 50px 20px;
    background-color: #f9f9f9;
    text-align: center;

    @media (max-width: 768px) {
        padding: 30px 10px;
    }
`;

/**
 * Styled component for the call-to-action button.
 * - margin-top: Adds space above the button.
 * - padding: Adds space inside the button.
 * - background-color: Sets the button's background color.
 * - &:hover: Changes the background color when the button is hovered over.
 */
const CTAButton = styled(Button)`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    &:hover {
        background-color: #0056b3;
    }
`;

/**
 * Styled component for the form inside the call-to-action section.
 * - display: Sets the display style to flex for flexible box layout.
 * - flex-direction: Aligns items in a column.
 * - align-items: Centers the items.
 * - gap: Adds space between items.
 * - width: Sets the width of the form to 100%.
 * - max-width: Limits the maximum width of the form.
 * - media query: Adjusts the gap for screens with a width of 768px or less.
 */
const CTAForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

/**
 * Main component for the call-to-action section.
 * - validationSchema: Defines the validation rules using Yup.
 * - Formik: Handles the form state and validation.
 * - initialValues: Sets the initial values for the form fields.
 * - onSubmit: Function to handle form submission.
 * - errors, touched: Formik properties to handle validation errors and touched fields.
 */
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