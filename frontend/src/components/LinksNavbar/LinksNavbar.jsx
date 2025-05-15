import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaUserPlus, FaBook, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import './LinksNavbarStyle.css';

const LinksNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const storedTheme = localStorage.getItem('darkThemeEnabled');
    return storedTheme === 'true'; // Default is false (light theme)
  });

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    localStorage.setItem('darkThemeEnabled', isDarkTheme);
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const links = [
    { path: '/user/main', label: 'Home', icon: <FaHome /> },
    { path: '/user/main/guest-registration', label: 'Guest Registration', icon: <FaUserPlus /> },
    { path: '/user/main/personal-diary', label: 'Personal Diary', icon: <FaBook /> },
  ];

  const signOut = { path: '/sign-out', label: 'Sign Out', icon: <FaSignOutAlt /> };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="LinksNavbar__container">
      <div className="LinksNavbar__left">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => navigate(link.path)}
            className={`LinksNavbar__button ${isActive(link.path) ? 'LinksNavbar__button--active' : ''}`}
          >
            <span className="LinksNavbar__icon">{link.icon}</span>
            {link.label}
          </button>
        ))}
      </div>
      <div className="LinksNavbar__right">
        
            <button
  onClick={toggleTheme}
  className="LinksNavbar__button LinksNavbar__theme-toggle"
  title="Toggle Theme"
>
  <span className="LinksNavbar__icon">{isDarkTheme ? <FaSun /> : <FaMoon />}</span>
</button>

        <button
          onClick={() => navigate(signOut.path)}
          className={`LinksNavbar__button ${isActive(signOut.path) ? 'LinksNavbar__button--active' : ''}`}
        >
          <span className="LinksNavbar__icon">{signOut.icon}</span>
          {signOut.label}
        </button>
      </div>
    </div>
  );
};

export default LinksNavbar;
