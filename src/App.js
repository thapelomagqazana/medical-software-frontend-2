import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './redux/store';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from "./pages/SignInPage";
import Dashboard from './pages/DashboardPage';
import Header from './components/global/Header';
import Footer from './components/global/Footer';
// import ProfilePage from './pages/ProfilePage';
// import AppointmentSchedulingPage from './pages/AppointmentSchedulingPage';
// import PrivateRoute from './components/PrivateRoute';
// import YourAppointmentsPage from './pages/YourAppointmentsPage';

const App = () => (
  <Provider store={store}>
    <Router>
      < Header/>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        {/* <Route path="/dashboard" element={<PatientDashboardPage />} /> */}
        {/* <Route path="/your-appointments" element={<YourAppointmentsPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  </Provider>
);

export default App;
