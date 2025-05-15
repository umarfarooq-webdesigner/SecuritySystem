import React from 'react';
import './CountCard.css';

const CountCard = ({ title, count, icon, color }) => {
  return (
    <div className="entry-card">
      <div className="icon" style={{ color }}>
        {icon}
      </div>
      <div className="info">
        <p className="count">{count}</p>
        <p className="title">{title}</p>
      </div>
    </div>
  );
};

export default CountCard;
