// EntryLogList.jsx
import React, { useEffect, useState } from 'react';
import Card from '../../../../components/card/Card';
import RefreshButton from '../../../../components/RefreshButton/RefreshButton';
import './EntryLogList.css';

const EntryLogList = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/accessLogs');
      if (!response.ok) throw new Error('Failed to fetch access logs');
      const data = await response.json();
      setLogs(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load entries');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleClearAll = () => {
    setLogs([]); // Clear the entries (in UI only)
  };

  return (
    <div className="entry-log-container">
      <div className="entry-log-header">
        <h3 className="entry-log-title">All Entries</h3>
        <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
      </div>

      {error && <p className="entry-log-error">{error}</p>}
      {logs.length === 0 && !error && <p className="entry-log-empty">No entries found.</p>}

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

export default EntryLogList;
