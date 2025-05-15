// src/pages/Guest/GuestRegistration.jsx
import React, { useState } from 'react';
import LinksNavbar from '../../../components/LinksNavbar/LinksNavbar';
import GuestSideNavbar from '../../../components/GuestSideNavbar/GuestSideNavbar';
import GuestRegistrationForm from './GuestRegistrationPage/GuestRegistrationPage';
import GuestLogsPage from './GuestLogs/GuestLogsPage';
import GuestListPage from './GuestEntriesList/GuestListPage';

const GuestRegistration = () => {
  const [activeKey, setActiveKey] = useState('guestRegistration');

  const renderContent = () => {
    switch (activeKey) {
      case 'guestRegistration':
        return <div><GuestRegistrationForm /></div>;
      case 'guestLogs':
        return <div><GuestLogsPage/></div>;
      case 'guestEntriesList':
        return <div><GuestListPage/></div>;
      default:
        return <div>Select a valid section</div>;
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <LinksNavbar />
      <div style={{ display: 'flex', height: 'calc(100vh - 50px)' }}>
        <div style={{ width: '220px', flexShrink: 0 }}>
          <GuestSideNavbar activeKey={activeKey} setActiveKey={setActiveKey} />
        </div>
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

export default GuestRegistration;
