import React, { useState } from 'react';
import './ManualEntries.css';
import { FaSearch, FaCheckCircle, FaTimesCircle, FaUserCircle } from 'react-icons/fa';
import RefreshButton from '../../../../components/RefreshButton/RefreshButton';

const ManualEntries = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState('');

  const handleSearch = async () => {
    const id = searchId.trim().toUpperCase();
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:5000/api/securityStaff/${id}`);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'ID not found');
        setResult(null);
        return;
      }

      const data = await response.json();

      setResult({
        name: data.name,
        id: data.id,
        roll: data.roll,
        image: data.image,
      });

      setError('');
    } catch (err) {
      console.error(err);
      setError('Server error');
      setResult(null);
    }
  };

  const handleLog = async (status) => {
    if (!result) return;

    try {
      const response = await fetch('http://localhost:5000/api/accessLogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: result.name,
          userid: result.id,
          role: result.roll,
          status,
          method: 'manual',
          image: result.image,
        }),
      });

      if (response.ok) {
        setMessage(`Access ${status === 'granted' ? 'granted' : 'denied'}.`);
        setMessageStatus(status);
        setResult(null);

        setTimeout(() => {
          setMessage('');
          setSearchId('');
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage(`Failed to log access: ${errorData.message}`);
        setMessageStatus('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error while logging access.');
      setMessageStatus('error');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="manual-container">
      <div className="manual-search">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter ID"
          className="manual-input"
        />
        <button onClick={handleSearch} className="manual-button">
          <FaSearch style={{ marginRight: '6px' }} />
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {message && (
        <p className={`access-message ${messageStatus}`}>
          {message}
        </p>
      )}

      {result && (
        <div className="card">
          <div className="card-row">
            <div className="card-left">
              <div className="card-inline-info">
                <span><strong>{result.name}</strong></span>
                <span>{result.id}</span>
                <span>{result.roll}</span>
              </div>
              <div className="card-buttons">
                <button className="allow-btn" onClick={() => handleLog('granted')}>
                  <FaCheckCircle style={{ marginRight: '5px' }} />
                  Grant Access
                </button>
                <button className="deny-btn" onClick={() => handleLog('denied')}>
                  <FaTimesCircle style={{ marginRight: '5px' }} />
                  Deny
                </button>
              </div>
            </div>
            <img
              src={result.image || <FaUserCircle />}
              alt="User"
              className="card-image"
            />
          </div>
        </div>
      )}
      <RefreshButton />
    </div>
  );
};

export default ManualEntries;
