import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from "./pages/SignInPage";
import PatientDashboardPage from './pages/PatientDashboardPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/dashboard" element={<PrivateRoute element={<PatientDashboardPage />} />}/>
      {/* Add more routes here as needed */}
    </Routes>
  </Router>
);

export default App;
