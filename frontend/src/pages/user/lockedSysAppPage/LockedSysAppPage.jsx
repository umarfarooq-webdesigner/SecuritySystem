import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LockedSysAppPageStyle.css';
import Button from '../../../components/Button/Button.jsx';

const LockedSysAppPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict input on key level
    if (name === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    if (name === 'phone') {
      if (!/^\d*$/.test(value)) return;
    }

    if (name === 'userId') {
      if (!/^[a-zA-Z0-9]*$/.test(value)) return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const errs = {};

    // User ID: required, alphanumeric, min 9, max 15
    if (!formData.userId.trim()) {
      errs.userId = 'User ID is required';
    } else if (!/^[a-zA-Z0-9]{9,15}$/.test(formData.userId)) {
      errs.userId = 'User ID must be 9–15 alphanumeric characters';
    }

    // Name: required, only alphabets, min 4, max 20
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]{4,20}$/.test(formData.name)) {
      errs.name = 'Name must be 4–20 letters only';
    }

    // Phone: required, only digits, min 10, max 15
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      errs.phone = 'Phone must be 10–15 digits only';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/lockedSysApp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/user/locked/lockedSysApp/applicationsubmitted');
      } else {
        alert('Failed to submit: ' + data.message);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LockedSysApp-container">
      <form onSubmit={handleSubmit} className="LockedSysApp-form">
        <div className="LockedSysApp-field">
          <label>User ID<span className="LockedSysApp-required">*</span></label>
          <input
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="LockedSysApp-input"
            maxLength="15"
          />
          {errors.userId && <span className="LockedSysApp-error">{errors.userId}</span>}
        </div>

        <div className="LockedSysApp-field">
          <label>Name<span className="LockedSysApp-required">*</span></label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="LockedSysApp-input"
            maxLength="20"
          />
          {errors.name && <span className="LockedSysApp-error">{errors.name}</span>}
        </div>

        <div className="LockedSysApp-field">
          <label>Phone No<span className="LockedSysApp-required">*</span></label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="LockedSysApp-input"
            maxLength="15"
          />
          {errors.phone && <span className="LockedSysApp-error">{errors.phone}</span>}
        </div>

        <div className="LockedSysApp-field">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="LockedSysApp-input"
          />
        </div>

        <Button type="submit" label={loading ? 'Submitting...' : 'Submit'} disabled={loading} />
      </form>
    </div>
  );
};

export default LockedSysAppPage;
