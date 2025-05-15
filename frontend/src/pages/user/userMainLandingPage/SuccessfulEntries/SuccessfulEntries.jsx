import React, { useEffect, useState } from 'react';
import Card from '../../../../components/card/Card';

const SuccessfulEntries = () => {
  const [grantedLogs, setGrantedLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrantedLogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accessLogs');
        if (!response.ok) {
          throw new Error('Failed to fetch access logs');
        }

        const data = await response.json();
        const grantedOnly = data.filter(log => log.status === 'granted');
        setGrantedLogs(grantedOnly);
        setError('');
      } catch (err) {
        console.error(err);
        setError('Failed to load granted entries');
      }
    };

    fetchGrantedLogs();
  }, []);

  return (
    <div className="manual-list-container" style={{paddingTop: '20px'}}>
      {error && <p className="error">{error}</p>}
      {grantedLogs.length === 0 && !error && <p>No granted entries found.</p>}
      {grantedLogs.map(log => (
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

export default SuccessfulEntries;
