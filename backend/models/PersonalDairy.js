const mongoose = require("mongoose");

const PersonalDairySchema = new mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.models.PersonalDairy || mongoose.model("PersonalDairy", PersonalDairySchema);
