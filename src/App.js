import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from "react-redux";
import store from './redux/store';
import LandingPage from './pages/LandingPage';
import PatientSignUpPage from './pages/PatientSignUpPage';
import SignInPage from "./pages/SignInPage";
import PatientDashboardPage from './pages/PatientDashboardPage';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
import ProfilePage from './pages/ProfilePage';
import AppointmentScheduling from './pages/AppointmentScheduling';

import { setUserFromToken, logout } from './redux/slices/authSlice';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          dispatch(logout());
        } else {
          dispatch(setUserFromToken(token));
        }
      }
      
  }, [dispatch]);

  return (
      <Router>
          <Header />
          <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path='/patient/sign-up' element={<PatientSignUpPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/patient/dashboard" element={<PrivateRoute><PatientDashboardPage /></PrivateRoute>} />
              {/* <Route path="/your-appointments" element={<PrivateRoute><YourAppointmentsPage /></PrivateRoute>} /> */}
              <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/schedule-appointment" element={<PrivateRoute><AppointmentScheduling /></PrivateRoute>} />
          </Routes>
          <Footer />
      </Router>
  );
};

const AppWrapper = () => (
  <Provider store={store}>
      <App />
  </Provider>
);

export default AppWrapper;

