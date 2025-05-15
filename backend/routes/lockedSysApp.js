// backend/routes/lockedSysApp.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema
const LockedSysAppSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String }
});

// Create the model
const LockedSysApp = mongoose.model('security_staff_locked_sys_app', LockedSysAppSchema);

// POST route to store form data
router.post('/', async (req, res) => {
  try {
    const { userId, name, phone, message } = req.body;

    const newApplication = new LockedSysApp({
      userId,
      name,
      phone,
      message
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
