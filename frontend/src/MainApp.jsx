import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './MainApp.css';
import './styles/variables.css';

import Navbar from './components/Navbar/Navbar'; // If you want Navbar on all pages
import LandingPage from './pages/landingPage/LandingPage';
import AdminLoginPage from './pages/admin/Login/AdminLoginPage';
import UserLoginPage from './pages/user/userLoginPage/UserLoginPage';
import UserMainLandingPage from './pages/user/userMainLandingPage/UserMainLandingPage';
import LockedPage from './pages/user/lockedPage/Locked';
import LockedSysAppPage from './pages/user/lockedSysAppPage/LockedSysAppPage';
import ApplicationSubmitted from './pages/user/appSubmitted/ApplicationSubmitted';
import GuestRegistration from './pages/user/Guest Registration/GuestRegistration';
import PersonalDiary from './pages/user/Personal Diary/PersonalDiary';
import AdminLandingPage from './pages/admin/AdminLandingPage/AdminLandingPage';


const MainApp = () => {
  return (
    <Router>
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* admin portal routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/main" element={<AdminLoginPage />} />


        {/* user portal routes */}
        <Route path="/user" element={<UserLoginPage />} />
        <Route path="/user/locked" element={<LockedPage />} />
        <Route path="/user/locked//lockedSysApp" element={<LockedSysAppPage />} />
        <Route path="/user/locked/lockedSysApp/applicationsubmitted" element={<ApplicationSubmitted  />} />
        <Route path="/user/main" element={<UserMainLandingPage />} />
        <Route path="/user/main/guest-registration" element={<GuestRegistration />} />
        <Route path="/user/main/personal-diary" element={<PersonalDiary />} />


      </Routes>
    </Router>
  );
};

export default MainApp;
