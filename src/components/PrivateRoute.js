import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PrivateRoute component
 * 
 * This component checks if the user is authenticated. If the user is authenticated, it renders the 
 * desired component. Otherwise, it redirects the user to the Sign-in Page.
 *
 * Props:
 * - element (React.Component): The component to render if the user is authenticated.
 *
 * Example usage:
 * <PrivateRoute element={<PatientDashboardPage />} />
 */
const PrivateRoute = ({ element: Component }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? Component : <Navigate to="/sign-in" />;
};

export default PrivateRoute;