import React, { useEffect, useState } from 'react';
import GuestLogsCard from '../../../../components/GuestLogsCard/GuestLogsCard';
import RefreshButton from '../../../../components/RefreshButton/RefreshButton';
import './GuestLogsPage.css';

const GuestLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const fetchGuestLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/guestlogs');
      if (!response.ok) {
        throw new Error('Failed to fetch guest logs');
      }
      const data = await response.json();
      setLogs(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load guest logs');
    }
  };

  useEffect(() => {
    fetchGuestLogs();
  }, []);

  return (
    <div className="guestlogs-container">
      <div className="guestlogs-header">
        <h2 className="guestlogs-title">Guest Logs</h2>
      </div>

      {error && <p className="guestlogs-error">{error}</p>}
      {logs.length === 0 && !error && <p className="guestlogs-empty">No guest entries found.</p>}

      {logs.map((log) => (
        <GuestLogsCard
          key={log._id}
          name={log.name}
          cnic={log.cnic}
          email={log.email}
          phone={log.phone}
          timestamp={log.timestamp}
          token={log.token}
        />
      ))}

      <RefreshButton />
    </div>
  );
};

export default GuestLogs;
