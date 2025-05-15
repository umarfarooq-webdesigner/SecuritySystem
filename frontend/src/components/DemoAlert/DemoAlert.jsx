import React from 'react';
import './DemoAlert.css'; // Import the style file

const DemoAlert = ({ message, onClose }) => {
  return (
    <div className="demo-alert-overlay">
      <div className="demo-alert-box">
        <h2 className="demo-alert-title">🔔 Alert</h2>
        <p>{message}</p>
        <button className="demo-alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default DemoAlert;
