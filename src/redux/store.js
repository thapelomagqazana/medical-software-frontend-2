import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patientDataReducer from "./patientDataSlice";
import doctorsReducer from "./doctorsSlice";
import appointmentsReducer from './appointmentsSlice';
import profileReducer from "./profileSlice";
import medicationsReducer from './medicationsSlice';

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