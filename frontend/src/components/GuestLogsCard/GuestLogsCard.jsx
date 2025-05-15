import React from 'react';
import './GuestLogsCard.css';

const GuestLogsCard = ({ name, cnic, email, phone, timestamp, token }) => {
  return (
    <div className="guestlog-card">
        <p style={{fontSize: '20px'}}><strong>Token:</strong><b>{token}</b> </p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>CNIC:</strong> {cnic}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}</p>
    </div>
  );
};

export default GuestLogsCard;
