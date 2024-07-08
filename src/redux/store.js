import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patientDataReducer from "./patientDataSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        patientData: patientDataReducer,
    },
});

export default store;