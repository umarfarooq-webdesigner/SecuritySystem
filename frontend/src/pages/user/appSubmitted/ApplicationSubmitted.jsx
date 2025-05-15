import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationSubmitted.css';

const ApplicationSubmitted = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/user'); // Update route if different
  };

  return (
    <div className="submitted-container">
      <h1 className="submitted-message">
        Application Submitted <span className="submitted-highlight">Successfully!</span>
      </h1>

      <button className="custom-submitted-btn" onClick={handleRedirect}>
        Back To Sign In Page
      </button>
    </div>
  );
};

export default ApplicationSubmitted;
