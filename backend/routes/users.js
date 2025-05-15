const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // This reads from "login" or "security_staff" collection
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET user by userid
router.get('/:userid', async (req, res) => {
  try {
    const { userid } = req.params;  // Get userid from URL parameters
    const user = await User.findOne({ userid });  // Find user by userid

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);  // Return the user data
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
