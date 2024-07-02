import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      {/* Add more routes here as needed */}
    </Routes>
  </Router>
);

export default App;
