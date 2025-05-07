import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './MainApp.css';
import './styles/variables.css';

import Navbar from './components/Navbar/Navbar'; // If you want Navbar on all pages
import LandingPage from './pages/landingPage/LandingPage';
import AdminPage from './pages/admin/adminPage';
import UserPage from './pages/user/userPage';

const MainApp = () => {
  return (
    <Router>
      <Navbar /> {/* Only shared layout components here */}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
};

export default MainApp;
