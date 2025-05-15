import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import './UserLoginPage.css';
// import Alert from '../../../components/alert/Alert';
import loginUser from './UserLoginDataPage';
import DemoAlert from '../../../components/DemoAlert/DemoAlert';


const UserLoginPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errors, setErrors] = useState({ userId: false, password: false });
  const [showLoginError, setShowLoginError] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();

  if (!userId.trim() || !password.trim()) {
    setAlertMessage('⚠️ Please fill in all fields');
    return;
  }

  const result = await loginUser(userId, password);

  if (result.success) {
    setErrors({ userId: false, password: false });
    setShowLoginError(false);
    setAlertMessage('');

    if (result.message === 'Login successful') {
      navigate('/user/main');
    }
  } else {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setErrors({ userId: true, password: true });
    setShowLoginError(true);

    // Always navigate to locked page if account is locked (even after first try)
    if (result.message === 'Account is locked' || result.remainingAttempts === 0) {
      setAlertMessage('🚫 Your account is locked due to 3 failed attempts.');
      navigate('/user/locked');
      return;
    }

    const remaining = result.remainingAttempts ?? (3 - newAttempts);
    setAlertMessage(`⚠️ ${result.message}. Only ${remaining} attempt(s) left.`);
  }
};

// _________________________________________________________
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setErrors((prev) => ({ ...prev, userId: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const closeAlert = () => setAlertMessage('');

  return (

<div className="userlogin-container">
      {alertMessage && (
        <div >
          <DemoAlert message={alertMessage} onClose={closeAlert} />
        </div>

)}

      <h1>User Login</h1>

      <form onSubmit={handleLogin}>
        <label>User ID</label>
        <input
          type="text"
          value={userId}
          onChange={handleUserIdChange}
          className={`input-field ${errors.userId ? 'error' : ''}`}
          placeholder="Enter your ID"
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

       <button type="submit" className="userlogin-button">
  <FaSignInAlt /> Login
</button>

        {showLoginError && (
          <p className="login-error-message">
            Incorrect credentials. Please try again. ({3 - attempts} attempts left)
          </p>
        )}
      </form>
    </div>
  );
};

export default UserLoginPage;
