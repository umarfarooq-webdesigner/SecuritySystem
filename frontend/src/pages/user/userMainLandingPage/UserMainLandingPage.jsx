import React, { useState, useEffect } from 'react';
import LinksNavbar from '../../../components/LinksNavbar/LinksNavbar';
import SideNavbar from '../../../components/SideNavbar/SideNavbar';

// ✅ Import content components
import Dashboard from './Dashboard/Dashboard';
import SuccessfulEntries from './SuccessfulEntries/SuccessfulEntries';
import ManualEntries from './ManualEntries/ManualEntries';
import ManualEntriesList from './ManualEntriesList/ManualEntriesList';
import InvalidEntries from './Invalid Entries/InvalidEntries';

const UserMainLandingPage = () => {
  // ✅ Load the active section from localStorage or default to 'dashboard'
  const [activeKey, setActiveKey] = useState(() => {
    return localStorage.getItem('activeKey') || 'dashboard';
  });

  // ✅ Save the active section to localStorage on change
  useEffect(() => {
    localStorage.setItem('activeKey', activeKey);
  }, [activeKey]);

  const renderContent = () => {
    switch (activeKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'successful':
        return <SuccessfulEntries />;
      case 'invalid':
        return <InvalidEntries />;
      case 'manualList':
        return <ManualEntriesList />;
      case 'manual':
        return <ManualEntries />;
      default:
        return (
          <div style={{ fontSize: '20px', textAlign: 'center', marginTop: '40px' }}>
            Select a valid section.
          </div>
        );
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Top navigation bar */}
      <LinksNavbar />

      {/* Layout: Sidebar + Main content */}
      <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
        {/* Sidebar with fixed width */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <SideNavbar activeKey={activeKey} setActiveKey={setActiveKey} />
        </div>

        {/* Main scrollable content area */}
        <div
          style={{
            flex: 1,
            padding: '20px',
            paddingTop: '70px',
            paddingLeft: '40px',
            overflowY: 'auto',
            height: 'calc(100vh - 50px)',
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserMainLandingPage;
