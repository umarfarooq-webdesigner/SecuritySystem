import React, { useEffect, useState } from 'react';
import Card from '../../../../components/card/Card';
import RefreshButton from '../../../../components/RefreshButton/RefreshButton';
import './ManualEntriesList.css';

const ManualEntriesList = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/accessLogs');
      if (!response.ok) {
        throw new Error('Failed to fetch access logs');
      }
      const data = await response.json();
      setLogs(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load manual entries');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="manual-list-container">
      <div className="manual-header">
        <h2 className="manual-title">All Manual Entries</h2>
      </div>

      {error && <p className="manual-error">{error}</p>}
      {logs.length === 0 && !error && <p className="manual-empty">No entries found.</p>}

      {logs.map((log) => (
        <Card
          key={log._id}
          name={log.username}
          id={log.userid}
          role={log.role}
          status={log.status}
          timestamp={log.timestamp}
          img={log.image}
        />
      ))}

      <RefreshButton />
    </div>
  );
};

export default ManualEntriesList;
