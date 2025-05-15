const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  name: String,
  cnic: { type: String, unique: true },
  email: String,
  phone: String,
  idType: String,
});

module.exports = mongoose.models.Guest || mongoose.model("Guest", GuestSchema);
