import React, { useEffect, useState } from 'react';
import Card from '../../../../components/card/Card';

const InvalidEntries = () => {
  const [deniedLogs, setDeniedLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeniedLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accessLogs');
        if (!response.ok) {
          throw new Error('Failed to fetch access logs');
        }

        const data = await response.json();
        const deniedOnly = data.filter(log => log.status === 'denied');
        setDeniedLogs(deniedOnly);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load denied entries');
      }
    };

    fetchDeniedLogs();
  }, []);

  return (
    <div className="manual-list-container" style={{paddingTop: '20px'}}>
      {error && <p className="error">{error}</p>}
      {deniedLogs.length === 0 && !error && <p>No denied entries found.</p>}
      {deniedLogs.map(log => (
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
    </div>
  );
};

export default InvalidEntries;
