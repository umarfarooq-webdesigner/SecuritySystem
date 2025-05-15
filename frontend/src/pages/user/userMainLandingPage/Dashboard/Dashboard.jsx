import React from 'react';
import './Dashboard.css';
import {
  FaCheckCircle,
  FaUserGraduate,
  FaExclamationTriangle,
  FaEdit,
  FaUserFriends,
} from 'react-icons/fa';
import CountCard from '../../../../components/CountCard/CountCard';
import useDashboardData from './DashboardDatabase';
import EntryLogList from './EntryLogList'; // 👈 Import new component

const Dashboard = () => {
  const counts = useDashboardData();

  const stats = [
    { title: 'Successful Entries', count: counts.successful, icon: <FaCheckCircle />, color: '#28a745' },
    { title: 'Student Entries', count: counts.student, icon: <FaUserGraduate />, color: '#007bff' },
    { title: 'Invalid Entries', count: counts.invalid, icon: <FaExclamationTriangle />, color: '#ffc107' },
    { title: 'Manual Entries', count: counts.manual, icon: <FaEdit />, color: '#17a2b8' },
    { title: 'Guest Entries', count: counts.guest, icon: <FaUserFriends />, color: '#6f42c1' },
  ];

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="card-grid">
        {stats.map((stat, index) => (
          <CountCard
            key={index}
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* 👇 Add this below the cards */}
      <EntryLogList />
    </div>
  );
};

export default Dashboard;
