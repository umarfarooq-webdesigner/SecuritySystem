const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema and model
const SecurityStaffSchema = new mongoose.Schema({
  userid: String,
  username: String,
  role: String,
  userimage: String, // base64 image string
});

const SecurityStaff = mongoose.model('SecurityStaff', SecurityStaffSchema, 'security_staff');

// GET /api/securityStaff/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const staff = await SecurityStaff.findOne(
      { userid: id.toUpperCase() },
      { _id: 0, username: 1, userid: 1, role: 1, userimage: 1 } // include userimage here
    );

    if (!staff) {
      return res.status(404).json({ message: 'ID not found' });
    }

    // Prepare response
    const responseData = {
      name: staff.username,
      id: staff.userid,
      roll: staff.role,
      image: `data:image/jpeg;base64,${staff.userimage}`
    };

    console.log('Sending to frontend:', responseData);
    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
