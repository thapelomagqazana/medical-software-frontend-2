/**
 * Importing necessary components.
 * - React: A JavaScript library for building user interfaces.
 * - Header, SignIn, Footer: Custom components for different sections of the sign-up page.
 */
import React from "react";
import Header from "../components/global/Header";
import SignIn from "../components/auth/SignInForm";
import Footer from "../components/global/Footer";


/**
 * SignUpPage component.
 * - Combines the header, sign-in form, and footer sections.
 * - Uses React fragments (<></>) to group multiple elements.
 */
const SignUpPage = () => (
    <>
        <Header />
        <SignIn />
        <Footer />
    </>
);

export default SignUpPage;