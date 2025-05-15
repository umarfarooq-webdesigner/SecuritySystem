const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const guestConnection = mongoose.createConnection(process.env.MONGO_URI_GUEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const guestLogSchema = new mongoose.Schema({
  name: String,
  cnic: String,
  email: String,
  phone: String,
  token: String, 
  timestamp: Date,
}, { collection: 'guestlogs' });


const GuestLog = guestConnection.model('GuestLog', guestLogSchema);

// GET /api/guestlogs - fetch all guest logs
router.get('/', async (req, res) => {
  try {
    const logs = await GuestLog.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    console.error('Error fetching guest logs:', err);
    res.status(500).send('Failed to fetch guest logs');
  }
});

module.exports = router;
