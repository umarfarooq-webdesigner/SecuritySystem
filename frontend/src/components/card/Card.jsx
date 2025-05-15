import React from 'react';
import './Card.css';
import { MdSecurity, MdOutlineCancel } from 'react-icons/md';

const Card = ({ name, id, role, status, timestamp, img, theme = 'dark' }) => {
  const Icon = status === 'granted' ? MdSecurity : MdOutlineCancel;

  return (
    <div className={`user-card ${status} ${theme}`}>
      <div className="left-section">
        <img className="user-avatar" src={img} alt="User Avatar" />
        <div className="user-info">
          <div className="user-row">
            <span className="user-name">{name}</span>
            <span className="user-id">ID: {id}</span>
            <span className="user-role">Role: {role}</span>
          </div>
          <div className="user-timestamp">
            {new Date(timestamp).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="right-icon">
        <Icon className={`status-icon ${status}`} />
      </div>
    </div>
  );
};

export default Card;
