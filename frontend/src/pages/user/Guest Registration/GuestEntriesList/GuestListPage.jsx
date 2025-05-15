// pages/Admin/Guests/GuestListPage.jsx
import React, { useEffect, useState } from 'react';
import GuestInfoCard from '../../../../components/GuestInfoCard/GuestInfoCard';
import './GuestListPage.css';
import RefreshButton from '../../../../components/RefreshButton/RefreshButton';

const GuestListPage = () => {
  const [guests, setGuests] = useState([]);
  const [error, setError] = useState('');

  const fetchGuests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/guest-entries-list');
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      const data = await response.json();
      setGuests(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load guests');
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <div className="guestlist-container">
      <div className="guestlist-header">
        <h2 className="guestlist-title">Guest Information</h2>
      </div>

      {error && <p className="guestlist-error">{error}</p>}
      {guests.length === 0 && !error && <p className="guestlist-empty">No guest records found.</p>}

      {guests.map((guest) => (
        <GuestInfoCard
          key={guest._id}
          name={guest.name}
          cnic={guest.cnic}
          email={guest.email}
          phone={guest.phone}
        />
      ))}
      <RefreshButton />
    </div>
  );
};

export default GuestListPage;
