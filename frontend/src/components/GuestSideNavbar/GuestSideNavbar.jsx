import React from 'react';
import '../SideNavbar/SideNavbar.css';
import {
  MdHowToReg,
  MdListAlt,
  MdHistory,
  MdSecurity
} from 'react-icons/md';

const navLinks = [
  { key: 'guestRegistration', label: 'Guest Registration', icon: <MdHowToReg size={24} /> },
  { key: 'guestLogs', label: 'Guest Logs', icon: <MdHistory size={24} /> },
  { key: 'guestEntriesList', label: 'Registered Guest List', icon: <MdListAlt size={24} /> },
];

const GuestSideNavbar = ({ activeKey, setActiveKey }) => {
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
      <div className="side-footer" style={{marginTop: '100%'}}>
        <p>
          <MdSecurity className="footer-icon" />
          &nbsp;Smart Security System
        </p>
      </div>
    </div>
  );
};

export default GuestSideNavbar;
