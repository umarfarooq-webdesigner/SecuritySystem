// components/Alert.js
import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div style={{
      padding: '10px 20px',
      backgroundColor: '#f44336',
      color: 'white',
      borderRadius: '5px',
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {message}
      <button onClick={onClose} style={{
        marginLeft: '20px',
        backgroundColor: 'white',
        color: '#f44336',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '3px'
      }}>
        Close
      </button>
    </div>
  );
};

export default Alert;
