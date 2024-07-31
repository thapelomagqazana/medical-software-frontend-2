/**
 * Importing necessary libraries and functions.
 * - createSlice, createAsyncThunk from "@reduxjs/toolkit": Functions for creating Redux slices and handling asynchronous actions.
 * - axios: A library for making HTTP requests.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../axiosInstance";

/**
 * API URL for authentication endpoints.
 */
const API_URL = "/patients";

/**
 * Async thunk for user registration.
 * - Makes a POST request to the /register endpoint.
 * - If successful, returns the response data.
 * - If an error occurs, returns the error response data.
 */
export const register = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
    }
});

/**
 * Async thunk for user login.
 * - Makes a POST request to the /login endpoint.
 * - If successful, stores the token in localStorage and returns the response data.
 * - If an error occurs, returns the error response data.
 */
export const login = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`${API_URL}/login`, user);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        // console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});

/**
 * Slice for authentication state management.
 * - initialState: Defines the initial state of the auth slice.
 * - reducers: Contains synchronous actions (logout, clearRegistrationSuccess).
 * - extraReducers: Handles actions for the async thunks (register, login).
 */
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")) : null,
        isAuthenticated: !!localStorage.getItem("token"),
        error: null,
        registrationSuccess: false,
    },
    reducers : {
        /**
         * Action to log out the user.
         * - Sets user to null and isAuthenticated to false.
         * - Removes the token from localStorage.
         */
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
        /**
         * Action to clear registration success flag.
         * - Sets registrationSuccess to false.
         */
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
        },
        setUserFromToken: (state, action) => {
            state.user = jwtDecode(action.payload);
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.registrationSuccess = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = jwtDecode(action.payload.token);
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

/**
 * Exporting actions for logout and clearRegistrationSuccess.
 */
export const { logout, clearRegistrationSuccess, setUserFromToken } = authSlice.actions;

/**
 * Exporting the auth reducer as the default export.
 */
export default authSlice.reducer;