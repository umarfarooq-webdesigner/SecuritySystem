import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import './RefreshButton.css';

const RefreshButton = () => {
  const handlePageRefresh = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handlePageRefresh}
      className="refresh-button"
      title="Refresh Page"
    >
      <FiRefreshCw size={20} />
    </button>
  );
};

export default RefreshButton;
