import React from 'react';
import './Alert.css';
import { FaExclamationTriangle } from 'react-icons/fa';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <FaExclamationTriangle className="alert-icon" />
        <p>{message}</p>
        <button onClick={onClose}>Got it</button>
      </div>
    </div>
  );
};

export default Alert;
