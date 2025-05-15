const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define schema for access_logs
const AccessLogSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userid: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ['granted', 'denied'], required: true },
  method: { type: String, default: 'manual' },
  timestamp: { type: Date, default: Date.now },
  image: { type: String, required: true } // base64 format
});

// Model
const AccessLog = mongoose.model('AccessLog', AccessLogSchema, 'access_logs');

// POST /api/accessLogs - store a new manual access log
router.post('/', async (req, res) => {
  const { username, userid, role, status, image } = req.body;

  // Basic validation
  if (!username || !userid || !role || !status || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newLog = new AccessLog({
      username,
      userid,
      role,
      status,
      image
    });

    await newLog.save();
    res.status(201).json({ message: 'Access log saved successfully' });
  } catch (error) {
    console.error('Error saving access log:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/accessLogs - fetch all manual access logs
router.get('/', async (req, res) => {
  try {
    const logs = await AccessLog.find({ method: 'manual' }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs', error: error.message });
  }
});

module.exports = router;
