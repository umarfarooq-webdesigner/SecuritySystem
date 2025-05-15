const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  status: String,
  name: String,
  loginAttempts: {
    type: Number,
    default: 0
  }
});

// Explicitly tell Mongoose to use the "security_staff" collection
module.exports = mongoose.model('User', userSchema, 'security_staff');
