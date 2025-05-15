import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import './adminloginPage.css';
import DemoAlert from '../../../components/DemoAlert/DemoAlert';
import loginAdmin from './AdminLoginDataPage';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState({ adminId: false, password: false });
  const [showLoginError, setShowLoginError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!adminId.trim() || !password.trim()) {
      setAlertMessage('⚠️ Please fill in all fields');
      return;
    }

    const result = await loginAdmin(adminId, password);

    if (result.success) {
      setErrors({ adminId: false, password: false });
      setShowLoginError(false);
      setAlertMessage('');

      if (result.message === 'Login successful') {
        navigate('/admin/main');
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setErrors({ adminId: true, password: true });
      setShowLoginError(true);

      if (result.message === 'Account is locked' || result.remainingAttempts === 0) {
        setAlertMessage('🚫 Your account is locked due to 3 failed attempts.');
        navigate('/admin/locked');
        return;
      }

      const remaining = result.remainingAttempts ?? (3 - newAttempts);
      setAlertMessage(`⚠️ ${result.message}. Only ${remaining} attempt(s) left.`);
    }
  };

  const handleAdminIdChange = (e) => {
    setAdminId(e.target.value);
    setErrors((prev) => ({ ...prev, adminId: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const closeAlert = () => setAlertMessage('');

  return (
    <div className="adminlogin-container">
      {alertMessage && (
        <div>
          <DemoAlert message={alertMessage} onClose={closeAlert} />
        </div>
      )}

      <h1>Admin Login</h1>

      <form onSubmit={handleLogin}>
        <label>Admin ID</label>
        <input
          type="text"
          value={adminId}
          onChange={handleAdminIdChange}
          className={`input-field ${errors.adminId ? 'error' : ''}`}
          placeholder="Enter your Admin ID"
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            className={`input-field ${errors.password ? 'error' : ''}`}
            placeholder="Enter your Password"
          />
          <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="adminlogin-button">
          <FaSignInAlt /> Login
        </button>

        <p className="forgot-link" onClick={() => navigate('/admin/forgot-password')}>
          Forgot Password?
        </p>

        {showLoginError && (
          <p className="login-error-message">
            Incorrect credentials. Please try again. ({3 - attempts} attempts left)
          </p>
        )}
      </form>
    </div>
  );
};

export default AdminLoginPage;
