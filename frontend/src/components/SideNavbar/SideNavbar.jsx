// src/components/SideNavbar.jsx
import React from 'react';
import './SideNavbar.css';
import {
  MdDashboard,
  MdCheckCircle,
  MdCancel,
  MdContactMail,
  MdListAlt,
  MdEdit,
  MdDarkMode,
  MdLightMode,
  MdSecurity
} from 'react-icons/md';

const navLinks = [
  { key: 'dashboard', label: 'Dashboard', icon: <MdDashboard size={24} /> },
  { key: 'successful', label: 'Successful Entries', icon: <MdCheckCircle size={24} /> },
  { key: 'invalid', label: 'Invalid Entries', icon: <MdCancel size={24} /> },
  { key: 'rfidManual', label: 'RFID - Manual Entries', icon: <MdContactMail size={24} /> },
  { key: 'manualList', label: 'Manual Entries List', icon: <MdListAlt size={24} /> },
  { key: 'manual', label: 'Manual Entries', icon: <MdEdit size={24} /> },
];

const SideNavbar = ({ activeKey, setActiveKey, isDarkTheme, toggleTheme }) => {
  return (
    <div className="side-navbar">
      {navLinks.map((link) => (
        <div
          key={link.key}
          onClick={() => setActiveKey(link.key)}
          className={`nav-link ${activeKey === link.key ? 'active' : ''}`}
        >
          <span className="nav-icon">{link.icon}</span>
          <span>{link.label}</span>
        </div>
      ))}
       <div className="side-footer">
      <p>
        <MdSecurity className="footer-icon" />
        &nbsp;Smart Security System
      </p>
    </div>
    </div>
  );
};

export default SideNavbar;