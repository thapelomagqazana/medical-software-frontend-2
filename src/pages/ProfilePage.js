import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/slices/profileSlice";
import { CircularProgress, Box } from "@mui/material";
import ProfileDisplay from "../components/profile/ProfileDisplay";
import ProfileEditForm from "../components/profile/ProfileEditForm";
import SuccessAlert from "../components/global/SuccessAlert";
import ErrorAlert from "../components/global/ErrorAlert";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const decodedToken = jwtDecode(user.token);
    const { profile, loading, error } = useSelector((state) => state.userProfile);
    const [editMode, setEditMode] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (user && decodedToken) {
            dispatch(fetchProfile(decodedToken.user.id));
        }
    }, [dispatch, user]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    const handleSubmit = (updatedProfile) => {
        console.log(updatedProfile);
        // dispatch(updateProfile(updatedProfile)).then((response) => {
        //     if (response.type === "patientProfile/updateProfile/fulfilled") {
        //         setSuccessMessage("Profile successfully updated!");
        //         setEditMode(false);
        //     }
        // });
    };

    if (loading) {
        return <Box textAlign="center"><CircularProgress /></Box>;
    }

    if (error) {
        return <Box textAlign="center"><ErrorAlert message={error} /></Box>;
    }

    return (
        <>
            <Box p={3}>
                {editMode ? (
                    <ProfileEditForm profileData={profile} onSubmit={handleSubmit} onCancel={handleCancel} />
                ) : (
                    <ProfileDisplay profile={profile} onEdit={handleEdit} />
                )}
                {successMessage && <SuccessAlert message={successMessage} />}
            </Box>
        </>
        
    );
};

export default ProfilePage;