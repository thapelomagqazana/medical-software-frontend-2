import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import patientDataReducer from "./slices/patientDataSlice";
import doctorsReducer from "./slices/doctorsSlice";
import appointmentsReducer from './slices/appointmentsSlice';
import profileReducer from "./slices/profileSlice";
import medicationsReducer from './slices/medicationsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        patientData: patientDataReducer,
        doctors: doctorsReducer,
        appointments: appointmentsReducer,
        userProfile: profileReducer,
        medications: medicationsReducer
    },
});

export default store;