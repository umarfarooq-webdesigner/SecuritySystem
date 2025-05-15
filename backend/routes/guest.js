const express = require("express");
const router = express.Router();

const Guest = require("../models/Guest");
const GuestLog = require("../models/GuestLog");

// Get guest by CNIC
router.get("/:cnic", async (req, res) => {
  try {
    const guest = await Guest.findOne({ cnic: req.params.cnic });
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: "Error fetching guest" });
  }
});

// Get latest token
router.get("/logs/latest-token", async (req, res) => {
  try {
    const latestLog = await GuestLog.findOne().sort({ timestamp: -1 });
    const lastToken = latestLog?.token || "00000";
    res.json({ token: lastToken });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch latest token" });
  }
});

// Save guest log
router.post("/logs", async (req, res) => {
  try {
    const { name, cnic, email, phone, idType, guestId } = req.body;

    // Get latest token and increment
    const latestLog = await GuestLog.findOne().sort({ timestamp: -1 });
    let newToken = "00001";
    if (latestLog?.token) {
      const lastTokenNum = parseInt(latestLog.token, 10);
      newToken = String(lastTokenNum + 1).padStart(5, "0");
    }

    const newLog = new GuestLog({
      name,
      cnic,
      email,
      phone,
      idType,
      guestId,
      token: newToken,
      timestamp: new Date(),
    });

    await newLog.save();
    res.status(201).json({ message: "Guest log saved", token: newToken });
  } catch (err) {
    console.error("POST /logs error:", err);
    res.status(500).json({ error: "Failed to save guest log" });
  }
});

module.exports = router;
