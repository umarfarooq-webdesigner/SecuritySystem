const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userid: String,
  password: String,
  role: String,
  status: String,
  username: String
});

module.exports = mongoose.model('Admin', adminSchema);
