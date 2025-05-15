const mongoose = require("mongoose");

const GuestLogSchema = new mongoose.Schema({
  name: String,
  cnic: String,
  email: String,
  phone: String,
  idType: String,
  guestId: mongoose.Schema.Types.ObjectId,
  token: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.models.GuestLog || mongoose.model("GuestLog", GuestLogSchema);
