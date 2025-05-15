import React, { useState } from 'react';
import axios from 'axios';

const AdminForgotPassword = () => {
  const [tab, setTab] = useState('email');
  const [formData, setFormData] = useState({});

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const endpoint = tab === 'email' ? '/api/admin/forgot-email' : '/api/admin/reset-password';
      const res = await axios.post(endpoint, formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div>
      <h2>Admin Forgot Password</h2>
      <div>
        <button onClick={() => setTab('email')}>Retrieve Via Email</button>
        <button onClick={() => setTab('secret')}>Reset Via Secret Question</button>
      </div>
      {tab === 'email' ? (
        <div>
          <input name="studentId" placeholder="Student Id" onChange={handleChange} />
          <input name="email" placeholder="Personal Email Address" onChange={handleChange} />
        </div>
      ) : (
        <div>
          <input name="studentId" placeholder="Student Id" onChange={handleChange} />
          <input name="question" placeholder="Secret Question" onChange={handleChange} />
          <input name="answer" placeholder="Secret Answer" onChange={handleChange} />
          <input name="newPassword" placeholder="New Password" onChange={handleChange} />
          <input name="confirmPassword" placeholder="Confirm New Password" onChange={handleChange} />
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AdminForgotPassword;