import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUserTie } from 'react-icons/fa'; // Add icons
import "./LandingPage.css";
import Images from '../../assets/Images';

const LandingPage = () => {
  return (
    <div className="smart-entrance-page">
      <div className="main-content">
        <h2 className="subtitle">Welcome To The</h2>
        <h1 className="title_text">SMART ENTRANCE</h1>
        <p className="description">Security Solution</p>

        <div className="role-buttons">
<Link to="/admin" className="role-button">
  <div className="role-icon"><FaUserTie /></div>
  <span className="role-label">ADMIN</span>
</Link>

<Link to="/user" className="role-button">
  <div className="role-icon"><FaUserShield /></div>
  <span className="role-label">SECURITY <br /> STAFF</span>
</Link>


        </div>
      </div>
    </div>
  );
};

export default LandingPage;
