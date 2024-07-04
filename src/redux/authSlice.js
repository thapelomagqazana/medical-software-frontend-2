import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"

export const register = createAsyncThunk("auth/register", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user);
        localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.error);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        error: null,
        registrationSuccess: false,
    },
    reducers : {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
        clearRegistrationSuccess: (state) => {
            state.registrationSuccess = false;
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
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout, clearRegistrationSuccess } = authSlice.actions;
export default authSlice.reducer;