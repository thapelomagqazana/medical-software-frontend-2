// Importing necessary libraries and components
import React from "react";
import Header from "../components/Header";
import SignUp from "../components/SignUpForm";
import Footer from "../components/Footer";

/**
 * SignUpPage is a React functional component that renders the sign-up page of the application.
 * It includes a header, a sign-up form, and a footer.
 */
const SignUpPage = () => (
    <>
        <Header />
        <SignUp />
        <Footer />
    </>
);

// Exporting the SignUpPage component as the default export of this module.
export default SignUpPage;