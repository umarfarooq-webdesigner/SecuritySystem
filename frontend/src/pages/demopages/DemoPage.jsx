// src/pages/DemoPage.jsx
import React, { useState } from 'react';
import DemoAlert from './DemoAlert';

const DemoPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', position: 'relative', height: '100vh' }}>
      <h1>DemoPage</h1>

      <button
        onClick={handleButtonClick}
        style={{
          padding: '12px 24px',
          backgroundColor: '#006977',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        Show Demo Alert
      </button>

      {showAlert && <DemoAlert message="This is a custom alert for DemoPage only." onClose={closeAlert} />}
    </div>
  );
};

export default DemoPage;
