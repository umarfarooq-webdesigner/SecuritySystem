const express = require('express');
const router = express.Router();
const Admin = require('../models/AdminModel');

// GET all admins
router.get('/admins', async (req, res) => {
  try {
    const admins = await Admin.find({}, { password: 0 }); // Exclude passwords for safety
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
