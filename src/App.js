import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      {/* Add more routes here as needed */}
    </Routes>
  </Router>
);

export default App;
