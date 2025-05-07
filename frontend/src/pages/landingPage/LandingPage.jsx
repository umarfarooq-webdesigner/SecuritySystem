import React from 'react';
import { Link } from 'react-router-dom';
import "./LandingPage.css";
import Navbar from '../../components/Navbar/Navbar';
const LandingPage = () => {
  return (
    <div className="smart-entrance-page">

      <div className="main-content">
        <h2 className="subtitle">Welcome To The</h2>
        <h1 className="title">SMART ENTRANCE</h1>
        <p className="description">Security Solution</p>

        <div className="role-buttons">
          <Link to="/admin" className="role-button">
            <img src="https://picsum.photos/seed/admin/160" alt="Admin" className="role-image" />
            <span className="role-label">ADMIN</span>
          </Link>

          <Link to="/user" className="role-button">
            <img src="https://picsum.photos/seed/security/160" alt="User" className="role-image" />
            <span className="role-label">USER</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
