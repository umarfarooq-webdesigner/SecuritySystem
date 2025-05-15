import React from 'react';
import './GuestInfoCard.css';

const GuestInfoCard = ({ name, cnic, email, phone }) => {
  return (
    <div className="guestinfo-card">
      <div className="guestinfo-header">
        <h3>{name}</h3>
      </div>
      <div className="guestinfo-content">
        <p><span>CNIC:</span> {cnic}</p>
        <p><span>Email:</span> {email}</p>
        <p><span>Phone:</span> {phone}</p>
      </div>
    </div>
  );
};

export default GuestInfoCard;
