import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from "./pages/SignInPage";
import Dashboard from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AppointmentSchedulingPage from './pages/AppointmentSchedulingPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}/>
      <Route path="/schedule-appointment" element={<PrivateRoute element={<AppointmentSchedulingPage />} />} />
      <Route path="/profile" element={<PrivateRoute element={<ProfilePage /> } />} />
      {/* Add more routes here as needed */}
    </Routes>
  </Router>
);

export default App;
