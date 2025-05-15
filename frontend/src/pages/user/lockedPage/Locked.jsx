import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import './LockedStyle.css';

const LockedPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/user/locked//lockedSysApp');
  };

  return (
    <div className="locked-container">
      <FaLock size={150} />
      <p className="locked-text">
        User System Locked. Only Admin Can Unlock.
      </p>
      <p className="locked-admin" onClick={handleAdminClick}>
        <u><b>Admin?</b></u>
      </p>
    </div>
  );
};

export default LockedPage;
