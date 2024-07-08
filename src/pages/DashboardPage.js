import React from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import PatientDashboardPage from "./PatientDashboardPage";

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
        return <div>Loading...</div>
    }

    const decodedToken = jwtDecode(user.token);

    switch (decodedToken.user.role) {
        case "patient":
            return <PatientDashboardPage />
        default:
            return <div>Invalid role</div>
    }
};

export default Dashboard;