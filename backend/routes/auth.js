// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');




router.post('/login', async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ userid: id });

    if (!user) {
      return res.status(401).json({ message: 'Invalid User ID or Password' });
    }

    // Always block login if the account is locked, regardless of the password
    if (user.status === 'locked') {
      return res.status(403).json({
        message: 'Account is locked',
        remainingAttempts: 0
      });
    }

    if (user.password !== password) {
      user.loginAttempts += 1;

      if (user.loginAttempts >= 3) {
        user.status = 'locked';
        await user.save();
        return res.status(401).json({
          message: 'Incorrect credentials. Account is now locked.',
          remainingAttempts: 0,
        });
      }

      await user.save();
      return res.status(401).json({
        message: 'Incorrect credentials. Try again.',
        remainingAttempts: 3 - user.loginAttempts,
      });
    }

    // Successful login → reset attempts
    user.loginAttempts = 0;
    await user.save();

    return res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;



