// server/routes/guest_entries_list.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const guestConnection = mongoose.createConnection(process.env.MONGO_URI_GUEST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const guestSchema = new mongoose.Schema({
  name: String,
  cnic: String,
  email: String,
  phone: String,
}, { collection: 'guests' });

const Guest = guestConnection.model('Guest', guestSchema);

// GET /api/guest-entries-list - fetch all guests
router.get('/', async (req, res) => {
  try {
    const guests = await Guest.find().sort({ name: 1 });
    res.json(guests);
  } catch (err) {
    console.error('Error fetching guest entries:', err);
    res.status(500).send('Failed to fetch guest entries');
  }
});

module.exports = router;
